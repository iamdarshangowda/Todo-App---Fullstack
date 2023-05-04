export const TodoIconSmall = () => {
  return (
    <svg
      width="64px"
      height="64px"
      viewBox="0 0 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <g>
          <path
            d="M224.001997,0 L31.9980026,0 C14.3579381,0.0394964443 0.0614809418,14.336846 0,32 L0,224 C0,241.6 14.3971038,256 31.9980026,256 L224.001997,256 C241.602896,256 256,241.6 256,224 L256,32 C256,14.4 241.602896,0 224.001997,0"
            fill="#E44332"
          ></path>
          <path
            d="M54.132778,120.802491 C58.5960224,118.196275 154.476075,62.477451 156.667847,61.1862981 C158.859619,59.9110855 158.97917,55.9898065 156.508446,54.5711324 C154.053661,53.1604284 149.391165,50.4824817 147.661658,49.4543415 C145.192242,48.0957707 142.191169,48.132074 139.755339,49.5499825 C138.527947,50.2672896 56.6035026,97.8486625 53.8697654,99.4107981 C50.5781227,101.291737 46.5372925,101.323617 43.2695601,99.4107981 L0,74.0181257 L0,95.6011002 C10.5205046,101.801822 36.7181549,117.200015 43.062338,120.826401 C46.8481256,122.978322 50.4745117,122.930502 54.1407481,120.802491"
            fill="#FFFFFF"
          ></path>
          <path
            d="M54.132778,161.609296 C58.5960224,159.00308 154.476075,103.284257 156.667847,101.993104 C158.859619,100.717891 158.97917,96.7966121 156.508446,95.377938 C154.053661,93.9672339 149.391165,91.2892873 147.661658,90.2611471 C145.192242,88.9025763 142.191169,88.9388796 139.755339,90.3567881 C138.527947,91.0740952 56.6035026,138.655468 53.8697654,140.217604 C50.5781227,142.098542 46.5372925,142.130423 43.2695601,140.217604 L0,114.824931 L0,136.407906 C10.5205046,142.608627 36.7181549,158.00682 43.062338,161.633206 C46.8481256,163.785128 50.4745117,163.737307 54.1407481,161.609296"
            fill="#FFFFFF"
          ></path>
          <path
            d="M54.132778,204.966527 C58.5960224,202.360311 154.476075,146.641487 156.667847,145.350335 C158.859619,144.075122 158.97917,140.153843 156.508446,138.735169 C154.053661,137.324465 149.391165,134.646518 147.661658,133.618378 C145.192242,132.259807 142.191169,132.29611 139.755339,133.714019 C138.527947,134.431326 56.6035026,182.012699 53.8697654,183.574835 C50.5781227,185.455773 46.5372925,185.487654 43.2695601,183.574835 L0,158.182162 L0,179.765137 C10.5205046,185.965858 36.7181549,201.364051 43.062338,204.990437 C46.8481256,207.142359 50.4745117,207.094538 54.1407481,204.966527"
            fill="#FFFFFF"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export const MenuIcon = (props: { fill?: string }) => {
  const { fill } = props;
  return (
    <svg
      width="30px"
      height="30px"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
      <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
      <g id="SVGRepo_iconCarrier">
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M4 5C3.44772 5 3 5.44772 3 6C3 6.55228 3.44772 7 4 7H20C20.5523 7 21 6.55228 21 6C21 5.44772 20.5523 5 20 5H4ZM3 12C3 11.4477 3.44772 11 4 11H20C20.5523 11 21 11.4477 21 12C21 12.5523 20.5523 13 20 13H4C3.44772 13 3 12.5523 3 12ZM3 18C3 17.4477 3.44772 17 4 17H20C20.5523 17 21 17.4477 21 18C21 18.5523 20.5523 19 20 19H4C3.44772 19 3 18.5523 3 18Z"
          fill={fill ? fill : '#000000'}
        ></path>
      </g>
    </svg>
  );
};

export const SearchIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
      />
    </svg>
  );
};
