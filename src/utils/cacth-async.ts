import { NextApiRequest, NextApiResponse } from 'next';

export const catchAsync = <T extends (...args: any[]) => Promise<any>>(fn: T) => {
  return (req: NextApiRequest, res: NextApiResponse, next: (err?: Error | undefined) => void) => {
    fn(req, res, next).catch((error: Error) => {
      next(error);
    });
  };
};