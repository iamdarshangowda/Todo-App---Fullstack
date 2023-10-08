import { ISVGIocnProps } from '@utils/types';

export const TodoIconSmall = (props: any) => {
  const { size } = props;
  return (
    <svg
      width={size ? size : '64px'}
      height={size ? size : '64px'}
      viewBox="0 0 256 256"
      version="1.1"
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      preserveAspectRatio="xMidYMid"
      fill="#000000"
    >
      <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
      <g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g>
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

export const MenuIcon = () => {
  return (
    <svg
      className="w-6 h-6"
      aria-hidden="true"
      fill="currentColor"
      viewBox="0 0 20 20"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        clipRule="evenodd"
        fillRule="evenodd"
        d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
      ></path>
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

export const UpcommingIcon = (props: ISVGIocnProps) => {
  const { size, stroke } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  );
};

export const TodayMenuIcon = (props: ISVGIocnProps) => {
  const { size, stroke } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M8.25 6.75h12M8.25 12h12m-12 5.25h12M3.75 6.75h.007v.008H3.75V6.75zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zM3.75 12h.007v.008H3.75V12zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm-.375 5.25h.007v.008H3.75v-.008zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  );
};

export const MicroPhoneIcon = (props: ISVGIocnProps) => {
  const { size, stroke } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  );
};

export const CalendarMenuIcon = (props: ISVGIocnProps) => {
  const { size, stroke } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5m-9-6h.008v.008H12v-.008zM12 15h.008v.008H12V15zm0 2.25h.008v.008H12v-.008zM9.75 15h.008v.008H9.75V15zm0 2.25h.008v.008H9.75v-.008zM7.5 15h.008v.008H7.5V15zm0 2.25h.008v.008H7.5v-.008zm6.75-4.5h.008v.008h-.008v-.008zm0 2.25h.008v.008h-.008V15zm0 2.25h.008v.008h-.008v-.008zm2.25-4.5h.008v.008H16.5v-.008zm0 2.25h.008v.008H16.5V15z"
      />
    </svg>
  );
};

export const StickyNotes = (props: ISVGIocnProps) => {
  const { size, stroke } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z"
      />
    </svg>
  );
};

export const SettingsIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75"
      />
    </svg>
  );
};

export const SignOutIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"
      />
    </svg>
  );
};

export const AddIcon = (props: any) => {
  const { size } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className={`${size ? size : 'w-5 h-5'}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
  );
};

export const CloseIcon = (props: any) => {
  const { fill, size } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${fill ? fill : 'none'}`}
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke={`${fill ? fill : 'currentColor'}`}
      className={`${size ? size : 'w-6 h-6'}`}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
};

export const RightIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
    </svg>
  );
};

export const LeftArrowIcon = (props: any) => {
  const { fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={fill ? fill : 'none'}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18"
      />
    </svg>
  );
};

export const RecMicIcon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth="2"
      stroke="currentColor"
      className="w-5 h-5"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z"
      />
    </svg>
  );
};

export const CheckIcon = (props: any) => {
  const { size, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={`${size ? size : '24px'}`}
      height={`${size ? size : '24px'}`}
      fill={`${fill ? fill : 'default'}`}
    >
      <path d="M 20.292969 5.2929688 L 9 16.585938 L 4.7070312 12.292969 L 3.2929688 13.707031 L 9 19.414062 L 21.707031 6.7070312 L 20.292969 5.2929688 z" />
    </svg>
  );
};

export const DeleteIcon = (props: any) => {
  const { size, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${fill ? fill : 'default'}`}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
      />
    </svg>
  );
};

export const EditIcon = (props: any) => {
  const { size, fill } = props;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill={`${fill ? fill : 'default'}`}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
      />
    </svg>
  );
};
