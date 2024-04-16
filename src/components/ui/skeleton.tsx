import clsx from 'clsx';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={clsx(
        'animate-pulse rounded-md bg-stone-100 dark:bg-stone-800',
        className
      )}
      {...props}
    />
  );
}

export { Skeleton };
