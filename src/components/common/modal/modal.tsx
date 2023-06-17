import { Dialog, Transition } from '@headlessui/react';
import React, {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
  Fragment,
  useRef,
} from 'react';

interface IModalProps {
  show: boolean;
  setShow: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
}

const Modal: FunctionComponent<IModalProps> = (props) => {
  const { show, setShow, children = '' } = props;

  const cancelButtonRef = useRef<HTMLDivElement>(null);

  return (
    <Transition.Root show={show} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-30"
        initialFocus={cancelButtonRef}
        onClose={setShow}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-opacity-10 transition-opacity" />
        </Transition.Child>
        <div className="fixed inset-0 z-10 overflow-y-auto overflow-x-auto">
          <div className="flex min-h-full items-center justify-center text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel
                className="relative transform overflow-hidden rounded-3xl text-left shadow-xl
              transition-all mx-1 sm:my-8 w-full max-w-sm lg:max-w-xl"
              >
                {children}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};

export default Modal;
