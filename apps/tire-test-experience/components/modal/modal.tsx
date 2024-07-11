/* eslint-disable @next/next/no-img-element */
"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";

import closeSvg from "@apps/tire-test-experience/public/svg/close.svg";

export type ModalA11yProps = {
  closeButtonA11yLabel?: string;
  closeImgAlt?: string;
};

export type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: string | React.ReactNode | null;
  modalA11yProps?: ModalA11yProps;
};

export const Modal = ({
  isOpen,
  onClose,
  children,
  modalA11yProps,
}: ModalProps) => {
  const { closeButtonA11yLabel = "Close", closeImgAlt = "Close Icon" } =
    modalA11yProps || {};

  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/40" />
        </Transition.Child>
        <div className="fixed inset-0 overflow-hidden">
          <div className="flex min-h-full md:p-4 items-end md:items-center justify-center">
            <Transition.Child
              as={Fragment}
              enter="md:ease-out duration-300 transition ease transform  duration-700 md:duration-500"
              enterFrom="md:opacity-0 md:scale-95 translate-y-full md:translate-y-0"
              enterTo="md:opacity-100 md:scale-100 translate-y-0"
              leave="transition ease transform duration-700 md:duration-300"
              leaveFrom="md:opacity-100 md:scale-100 -translate-y-0 md:translate-y-0"
              leaveTo="md:opacity-0 md:scale-95 translate-y-full md:translate-y-0"
            >
              <Dialog.Panel className="relative max-w-[800px] overflow-hidden rounded-[10px] bg-white p-8 lg:pb-14 text-left shadow-xl transition-all">
                {children}
                <button
                  className="absolute right-4 top-4"
                  onClick={onClose}
                  aria-label={closeButtonA11yLabel}
                >
                  <img src={closeSvg.src} alt={closeImgAlt} />
                </button>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};
