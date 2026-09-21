import logo from "@/assets/casa-bem-otto/logo-casa-bem-otto.webp.asset.json";
import heroSmall from "@/assets/casa-bem-otto/hero-480.webp.asset.json";
import heroLarge from "@/assets/casa-bem-otto/hero-1600.webp.asset.json";
import conceptMainSmall from "@/assets/casa-bem-otto/concept-main-480.webp.asset.json";
import conceptMainLarge from "@/assets/casa-bem-otto/concept-main-1600.webp.asset.json";
import conceptDetailSmall from "@/assets/casa-bem-otto/concept-detail-480.webp.asset.json";
import conceptDetailLarge from "@/assets/casa-bem-otto/concept-detail-1600.webp.asset.json";
import sofasSmall from "@/assets/casa-bem-otto/category-sofas-480.webp.asset.json";
import sofasLarge from "@/assets/casa-bem-otto/category-sofas-1600.webp.asset.json";
import bedroomSmall from "@/assets/casa-bem-otto/category-bedroom-480.webp.asset.json";
import bedroomLarge from "@/assets/casa-bem-otto/category-bedroom-1600.webp.asset.json";
import decorSmall from "@/assets/casa-bem-otto/category-decor-480.webp.asset.json";
import decorLarge from "@/assets/casa-bem-otto/category-decor-1600.webp.asset.json";
import tableSmall from "@/assets/casa-bem-otto/category-table-480.webp.asset.json";
import tableLarge from "@/assets/casa-bem-otto/category-table-1600.webp.asset.json";
import architectSmall from "@/assets/casa-bem-otto/category-architect-480.webp.asset.json";
import architectLarge from "@/assets/casa-bem-otto/category-architect-1600.webp.asset.json";
import gallery1Small from "@/assets/casa-bem-otto/gallery-1-480.webp.asset.json";
import gallery1Large from "@/assets/casa-bem-otto/gallery-1-1600.webp.asset.json";
import gallery2Small from "@/assets/casa-bem-otto/gallery-2-480.webp.asset.json";
import gallery2Large from "@/assets/casa-bem-otto/gallery-2-1600.webp.asset.json";
import gallery3Small from "@/assets/casa-bem-otto/gallery-3-480.webp.asset.json";
import gallery3Large from "@/assets/casa-bem-otto/gallery-3-1600.webp.asset.json";
import gallery4Small from "@/assets/casa-bem-otto/gallery-4-480.webp.asset.json";
import gallery4Large from "@/assets/casa-bem-otto/gallery-4-1600.webp.asset.json";
import gallery5Small from "@/assets/casa-bem-otto/gallery-5-480.webp.asset.json";
import gallery5Large from "@/assets/casa-bem-otto/gallery-5-1600.webp.asset.json";
import gallery6Small from "@/assets/casa-bem-otto/gallery-6-480.webp.asset.json";
import gallery6Large from "@/assets/casa-bem-otto/gallery-6-1600.webp.asset.json";
import closingSmall from "@/assets/casa-bem-otto/closing-480.webp.asset.json";
import closingLarge from "@/assets/casa-bem-otto/closing-1600.webp.asset.json";

export type ResponsiveAsset = { small: string; large: string };

export const casaAssets = {
  logo: logo.url,
  hero: { small: heroSmall.url, large: heroLarge.url },
  conceptMain: { small: conceptMainSmall.url, large: conceptMainLarge.url },
  conceptDetail: { small: conceptDetailSmall.url, large: conceptDetailLarge.url },
  sofas: { small: sofasSmall.url, large: sofasLarge.url },
  bedroom: { small: bedroomSmall.url, large: bedroomLarge.url },
  decor: { small: decorSmall.url, large: decorLarge.url },
  table: { small: tableSmall.url, large: tableLarge.url },
  architect: { small: architectSmall.url, large: architectLarge.url },
  gallery: [
    { small: gallery1Small.url, large: gallery1Large.url },
    { small: gallery2Small.url, large: gallery2Large.url },
    { small: gallery3Small.url, large: gallery3Large.url },
    { small: gallery4Small.url, large: gallery4Large.url },
    { small: gallery5Small.url, large: gallery5Large.url },
    { small: gallery6Small.url, large: gallery6Large.url },
  ],
  closing: { small: closingSmall.url, large: closingLarge.url },
} as const;