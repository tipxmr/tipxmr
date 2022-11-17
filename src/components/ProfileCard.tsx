import Image from "next/image";
import { FC } from "react";

import TipxmrLogo from "~/img/logo.png";
import { User } from "~/lib/config";

const ProfileCard: FC<User> = ({ id, alias, isOnline, socket }) => {
  // TODO plug in the avatar URL
  return (
    <>
      <div className="relative mx-auto mt-6 mb-6 mt-16 w-full min-w-0 max-w-md break-words rounded-xl bg-white shadow-lg md:max-w-2xl">
        <div className="px-6">
          <div className="flex flex-wrap justify-center">
            <div className="flex w-full justify-center">
              <div className="relative">
                <Image
                  src={TipxmrLogo}
                  alt="Streamer avatar"
                  width={250}
                  height={50}
                  className="absolute -m-16 -ml-20 max-w-[150px] rounded-full border-none align-middle shadow-xl lg:-ml-16"
                />
              </div>
            </div>
            <div className="mt-20 w-full text-center">
              <div className="flex justify-center pt-8 pb-0 lg:pt-4">
                <div className="p-3 text-center">
                  <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                    {socket || <span className="text-xs">Error</span>}
                  </span>
                  <span className="text-sm text-slate-400">SocketID</span>
                </div>
                <div className="p-3 text-center">
                  <span className="block text-xl font-bold uppercase tracking-wide text-slate-700">
                    {isOnline || <span className="text-xs">Error</span>}
                  </span>
                  <span className="text-sm text-slate-400">Online Status</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-2 text-center">
            <h3 className="mb-1 text-2xl font-bold leading-normal text-slate-700">
              {alias}
            </h3>
            <div className="mt-0 mb-2 text-xs font-bold uppercase text-slate-400">
              <i className="fas fa-map-marker-alt mr-2 text-slate-400 opacity-75"></i>
              {id}
            </div>
          </div>
          <div className="mt-6 border-t border-slate-200 py-6 text-center">
            {/* <div className="flex flex-wrap justify-center">
                        <div className="w-full px-4">
                            <p className="font-light leading-relaxed text-slate-600 mb-4">An artist of considerable range, Mike is the name taken by Melbourne-raised, Brooklyn-based Nick Murphy writes, performs and records all of his own music, giving it a warm.</p>
                            <a href="javascript:;" className="font-normal text-slate-700 hover:text-slate-400">Follow Account</a>
                        </div>
                    </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileCard;
