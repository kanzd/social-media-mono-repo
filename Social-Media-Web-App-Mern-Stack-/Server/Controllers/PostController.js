import mongoose from 'mongoose';
import postModel from '../Models/postModel.js';
import UserModel from '../Models/userModel.js';
import stringSimilarity from 'string-similarity';


// Create new post
export const createPost = async (req, res) => {
  const newPost = new postModel(req.body);
  try {
    await newPost.save();
    res.status(200).json(newPost);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Get a single post
export const getPost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json(error);
  }
};


// Update a post
export const updatePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.updateOne({ $set: req.body });
      res.status(200).json('Post Updated Successfully!');
    } else {
      res.status(403).json('Action forbidden');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Delete a post
export const deletePost = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (post.userId === req.body.userId) {
      await post.deleteOne();
      res.status(200).json('Post deleted Successfully!');
    } else {
      res.status(403).json('Action forbidden');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


// Like/Dislike a post
export const like_dislike_Post = async (req, res) => {
  try {
    const post = await postModel.findById(req.params.id);
    if (!post.likes.includes(req.body.userId)) {
      await post.updateOne({ $push: { likes: req.body.userId } });
      res.status(200).json('Post liked.');
    } else {
      await post.updateOne({ $pull: { likes: req.body.userId } });
      res.status(200).json('Post unliked.');
    }
  } catch (error) {
    res.status(500).json(error);
  }
};


/**
 * Get recommended posts for a user's timeline.
 * If the user has no likes/comments → returns default timeline.
 * Otherwise returns up to 20 newest posts ranked by NLP similarity.
 */
export const timeline = async (req, res) => {
    const userId = req.params.id;
  
    try {
      // 1. Default: own + followings (if you still want to use it when the user has follows)
      const ownPosts = await postModel.find({ userId });
      const followingAgg = await UserModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(userId) } },
        {
          $lookup: {
            from: 'posts',
            localField: 'following',
            foreignField: 'userId',
            as: 'followingPosts'
          }
        },
        { $project: { followingPosts: 1, _id: 0 } }
      ]);
      const defaultTimeline = ownPosts
        .concat(...(followingAgg[0]?.followingPosts || []))
        .sort((a, b) => b.createdAt - a.createdAt);
  
      // 2. Signals
      const liked     = await postModel.find({ likes: userId });
      const commented = await postModel.find({ 'comments.userId': userId });
      const interestPosts = [...liked, ...commented];
  
      // 3. If no signals → random fallback
      if (interestPosts.length === 0) {
        const randomPosts = await postModel.aggregate([{ $sample: { size: 20 } }]);
        return res.status(200).json(randomPosts);
      }
  
      // 4. Build seed descriptions
      const interestDescriptions = interestPosts
        .map(p => p.description || '')
        .filter(d => d.trim());
  
      // 5. Score candidates
      const candidates = await postModel.find({ userId: { $ne: userId } });
      const scored = candidates.map(p => {
        const desc  = p.description || '';
        const score = interestDescriptions.reduce((max, seed) => {
          const sim = stringSimilarity.compareTwoStrings(desc, seed);
          return sim > max ? sim : max;
        }, 0);
        return { post: p, score };
      });
  
      // 6. Sort and pick top 20
      scored.sort((a, b) => {
        if (b.score === a.score) {
          return b.post.createdAt - a.post.createdAt;
        }
        return b.score - a.score;
      });
      const recommended = scored.slice(0, 20).map(item => item.post);
  
      // 7. If scoring yields nothing → random fallback
      if (recommended.length === 0) {
        const randomPosts = await postModel.aggregate([{ $sample: { size: 20 } }]);
        return res.status(200).json(randomPosts);
      }
  
      // 8. Otherwise return your recommendations
      res.status(200).json(recommended);
  
    } catch (error) {
      res.status(500).json(error);
    }
  };
  