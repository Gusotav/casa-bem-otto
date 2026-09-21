import type { ResponsiveAsset } from "@/lib/casa-assets";

type Props = {
  asset: ResponsiveAsset;
  alt: string;
  className?: string;
  eager?: boolean;
  sizes?: string;
};

export function ResponsiveImage({ asset, alt, className, eager = false, sizes = "100vw" }: Props) {
  return (
    <img
      src={asset.large}
      srcSet={`${asset.small} 480w, ${asset.large} 1600w`}
      sizes={sizes}
      alt={alt}
      width={1600}
      height={1200}
      loading={eager ? "eager" : "lazy"}
      fetchPriority={eager ? "high" : "auto"}
      decoding={eager ? "sync" : "async"}
      className={className}
    />
  );
}