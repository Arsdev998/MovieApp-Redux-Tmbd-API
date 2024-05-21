import { PiTelevisionFill } from "react-icons/pi";
import { IoHome } from "react-icons/io5";
import { BiSolidMoviePlay } from "react-icons/bi";
import { FaSearch } from "react-icons/fa";

export const navigation = [
  {
    label: "TV Shows",
    href: "tv",
    icon:<PiTelevisionFill />
  },
  {
    label: "Movies",
    href: "movies",
    icon:<BiSolidMoviePlay/>
  },
];


export const mobileNav = [
  {
    label:'Home',
    href: '/',
    icon: <IoHome/>
  },
  ...navigation,
  {
    label: "Search",
    href: "search",
    icon:<FaSearch/>
  }
]