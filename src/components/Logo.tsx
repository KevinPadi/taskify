type LogoPropsType = {
  className?: string
}

const Logo = ({ className }: LogoPropsType) => {
  return (
    <svg version="1.0" xmlns="http://www.w3.org/2000/svg" className={`${className ? className : 'size-12'}`} viewBox="0 0 317.000000 296.000000"
      preserveAspectRatio="xMidYMid meet">

      <g transform="translate(0.000000,296.000000) scale(0.100000,-0.100000)"
      className="fill-black dark:fill-white" stroke="none">
      <path d="M871 2367 c-45 -14 -99 -71 -111 -118 -7 -25 -10 -250 -8 -636 l3
      -598 23 -37 c39 -62 82 -82 192 -86 146 -6 210 19 250 99 19 37 20 61 20 644
      0 575 -1 608 -19 643 -24 47 -50 70 -98 88 -45 16 -203 17 -252 1z"/>
      <path d="M1497 2366 c-22 -8 -50 -25 -64 -38 -51 -47 -53 -60 -53 -445 0 -340
      1 -359 21 -399 15 -33 32 -49 72 -68 44 -23 64 -26 150 -26 88 0 105 3 147 26
      31 17 56 40 71 67 l24 42 0 360 0 360 -25 44 c-37 65 -82 84 -205 88 -69 2
      -112 -1 -138 -11z"/>
      <path d="M2115 2365 c-49 -17 -90 -62 -104 -112 -7 -25 -11 -279 -11 -748 1
      -750 1 -756 47 -807 36 -41 91 -58 196 -58 138 0 191 24 228 105 17 38 19 83
      19 755 0 489 -4 728 -11 755 -14 50 -64 100 -114 114 -56 15 -202 13 -250 -4z"/>
      </g>
    </svg>
  )
}

export default Logo