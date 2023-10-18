import { FunctionComponent, PropsWithChildren } from 'react';

type ContentSectionProps = PropsWithChildren & {
  heading: string;
};

export const ContentSection: FunctionComponent<ContentSectionProps> = (props) => {
  const { heading, children } = props;

  return (
    <div className="flex flex-col space-y-4">
      <h1 className="text-white text-2xl">{heading}</h1>
      <div className="bg-white grow rounded p-4">
        {children}
      </div>
    </div>
  );
};