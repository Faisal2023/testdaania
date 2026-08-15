import type {Route} from './+types/_index';
import GlitchSlideshow from '~/components/GlitchSlideshow/GlitchSlideshow';
import glitchSlideshowStyles from '~/styles/glitch-slideshow.css?url';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Daania Official'}];
};

// Route-scoped stylesheet: React Router adds this <link> while on "/" and
// removes it again on navigation, so its full-viewport/overflow-hidden
// rules never leak onto other pages (collections, product, cart, etc).
export const links: Route.LinksFunction = () => [
  {rel: 'stylesheet', href: glitchSlideshowStyles},
];

export default function Homepage() {
  return <GlitchSlideshow />;
}
