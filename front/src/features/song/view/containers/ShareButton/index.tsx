import { FC } from 'react';

import { Button, Share } from 'shared/components';

const ShareButton: FC = () => {
  const handleShareClick = () => {};

  return (
    <Button size="small" onClick={handleShareClick}>
      <Share /> Share
    </Button>
  );
};

export { ShareButton };
