import "dotenv/config";
import { Router, type Request } from 'express';
import clerk, { type User, type WithAuthProp } from '@clerk/clerk-sdk-node';

import MessageResponse from '../../interfaces/MessageResponse';

const router = Router();

const posts = [
  {
    id: 1,
    userId: "user_2PQbfbdBOFOXCvNqNVpSnckWIsS",
    content: "contnet 1"
  },
  {
    id: 2,
    userId: "user_2PNk2GxKI9MI9a5UfAaLuqcnCT8",
    content: "contnet 2"
  }
]

router.get<{}, { data: any[] } | MessageResponse>('/', clerk.expressWithAuth(),
  async (req: WithAuthProp<Request>, res) => {

    const newPosts = await Promise.all(posts.map(async (post) => {
      const user = await clerk.users.getUser(post.userId);
      const newPost = { post: post, user: { userName: user.username, firstName: user.firstName, lastName: user.lastName, profileImageUrl: user.profileImageUrl } };
      return newPost
    }))

    res.status(200).json({
      data: newPosts,
    });
  });


export default router;
