import type { NextConfig } from 'next';
import { withPayload } from '@payloadcms/next/withPayload';

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['fiveirongolf.com']
  }
};

export default withPayload(nextConfig);
