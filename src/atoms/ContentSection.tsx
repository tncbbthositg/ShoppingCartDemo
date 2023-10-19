import cn from 'mxcn';
import { FunctionComponent, PropsWithChildren } from 'react';

type ContentSectionProps = PropsWithChildren & {
  heading: string;
  className?: string;
};

export const ContentSection: FunctionComponent<ContentSectionProps> = (props) => {
  const { heading, children, className } = props;

  const containerClasses = cn(
    "flex flex-col space-y-4",
    className
  );

  return (
    <div className={containerClasses}>
      <h1 className="text-white text-2xl">{heading}</h1>
      <div className="bg-white grow rounded p-4">
        {children}
      </div>
    </div>
  );
};
