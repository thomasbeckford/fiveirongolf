import React from 'react';
import { Badge } from './ui/badge';
import { Location } from '@/payload/generated-types';

export default function LocationBadge({ status }: { status: Location['status'] }) {
  let variant: 'default' | 'destructive' | 'secondary' | 'warning' | 'accent' | undefined;
  let text: string;

  switch (status) {
    case 'active':
      variant = 'default';
      text = 'OPEN';
      break;
    case 'coming-soon':
      variant = 'warning';
      text = 'COMING SOON';
      break;
    case 'temp-closed':
      variant = 'destructive';
      text = 'TEMP CLOSED';
      break;
    case 'closed':
      variant = 'accent';
      text = 'CLOSED';
      break;
  }

  return (
    <Badge className="uppercase font-bold" variant={variant}>
      {text}
    </Badge>
  );
}
