import "dotenv/config";
import { Router, type Request } from 'express';
import clerk, { type User, type WithAuthProp } from '@clerk/clerk-sdk-node';

import MessageResponse from '../../interfaces/MessageResponse';

const router = Router();

router.get<{},
  {
    data: {
      user: { firstName: string | null, lastName: string | null, imgUrl: string | null },
      org: string[]
    }
  } | MessageResponse>('/',
    clerk.expressWithAuth(),
    async (req: WithAuthProp<Request>, res) => {

      if (!req.auth.userId) {
        return res.json({
          message: "Error User Required",
        })
      }

      const userData = await clerk.users.getUser(req.auth.userId);
      const org = await clerk.users.getOrganizationMembershipList({ userId: req.auth.userId });

      res.json({
        data: {
          user: { firstName: userData.firstName, lastName: userData.lastName, imgUrl: userData.profileImageUrl },
          org: org.map((x) => x.organization.name),
        },
      });
    });


export default router
