import { createSocialImage, socialImageSize } from "./social-image";
import { SOCIAL_IMAGE_ALT } from "./site-metadata";

export const alt = SOCIAL_IMAGE_ALT;
export const size = socialImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return createSocialImage();
}
