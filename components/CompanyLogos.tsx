import React from "react";

export function JoblyLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="36" height="36" rx="10" fill="#5438DC" />
      {/* Abstract geometric flower / petals like the logo in the photo */}
      <circle cx="14" cy="14" r="5" fill="white" fillOpacity="0.9" />
      <circle cx="22" cy="14" r="5" fill="#C4B5FD" />
      <circle cx="14" cy="22" r="5" fill="#DDD6FE" />
      <circle cx="22" cy="22" r="5" fill="white" fillOpacity="0.95" />
    </svg>
  );
}

export function GoogleLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-white p-2 shadow-sm border border-zinc-100 ${className}`}
    >
      <svg viewBox="0 0 24 24" className="h-full w-full">
        <path
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
          fill="#4285F4"
        />
        <path
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
          fill="#34A853"
        />
        <path
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
          fill="#FBBC05"
        />
        <path
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
          fill="#EA4335"
        />
      </svg>
    </div>
  );
}

export function ShopifyLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#95BF47]/10 p-2 shadow-sm border border-[#95BF47]/20 ${className}`}
    >
      <svg viewBox="0 0 109 124" className="h-full w-full">
        <path
          d="M74.8 17.5c-.3 0-.6.1-.8.2-1.9-2.5-4.8-4.1-8.1-4.1-.7 0-1.4.1-2.1.2C62.4 6 56.4 0 49 0c-.8 0-1.6.1-2.4.2C43.1.6 39.9 2.5 37.8 5.4c-4.4 6.2-3.4 17.6-2.5 24.1l-20.9 6.4c-6.4 2-6.6 2.5-7.4 8.3L0 102.1c-.5 3.9 2.1 6.8 5.7 6.8h.6l68.7 14.3c4 .8 7.4-1.8 7.9-5.7l26-100.2c.4-3.9-2.1-7.2-5.7-7.2l-28.4 7.4z"
          fill="#95BF47"
        />
        <path
          d="M65.9 13.6c-3.3 0-6.2 1.6-8.1 4.1l17.8-3.9c-.2 0-.5-.1-.8-.2-.3-.1-.6-.2-.9-.2-2.6.1-5.4 0-8 .2z"
          fill="#5E8E3E"
        />
        <path
          d="M49 0c-.8 0-1.6.1-2.4.2C43.1.6 39.9 2.5 37.8 5.4c-4.4 6.2-3.4 17.6-2.5 24.1l14.4-4.4s.2-12.7 6.4-18.4c.5-.4 1.1-.9 1.7-1.3C54.8 2 51.9 0 49 0z"
          fill="#5E8E3E"
        />
        <path
          d="M62 45.4c-1.3-.8-3.1-1.3-5-1.3-6.2 0-10.4 4.5-10.4 9.9 0 9 12.8 11.2 12.8 18.2 0 3.2-2.5 5.2-6.1 5.2-4.1 0-7.2-2.2-7.2-2.2l-1.3 6.6s3.8 2.2 8.3 2.2c7.6 0 12.4-4.8 12.4-10.8 0-9.6-12.8-11.4-12.8-18.4 0-2.8 2.1-4.6 5.1-4.6 3.1 0 5.4 1.3 5.4 1.3l.8-6.1z"
          fill="#FFFFFF"
        />
      </svg>
    </div>
  );
}

export function MicrosoftLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-white p-2.5 shadow-sm border border-zinc-100 ${className}`}
    >
      <div className="grid grid-cols-2 gap-1 h-full w-full">
        <div className="bg-[#F25022] rounded-[2px]" />
        <div className="bg-[#7FBA00] rounded-[2px]" />
        <div className="bg-[#00A4EF] rounded-[2px]" />
        <div className="bg-[#FFB900] rounded-[2px]" />
      </div>
    </div>
  );
}

export function StripeLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#635BFF] text-white font-bold text-xl shadow-sm ${className}`}
    >
      <span>S</span>
    </div>
  );
}

export function AirbnbLogo({
  className = "h-10 w-10",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-[#FF5A5F]/10 p-2 shadow-sm border border-[#FF5A5F]/20 ${className}`}
    >
      <svg viewBox="0 0 32 32" className="h-full w-full fill-[#FF5A5F]">
        <path d="M16 1c2.008 0 3.463.963 4.751 3.269l.533 1.025c1.954 3.83 6.18 12.515 7.678 15.795 1.554 3.407 2.038 6.002 1.365 8.237-.671 2.228-2.38 3.864-4.811 4.498-1.571.409-3.328.329-5.115-.236-2.12-.67-4.103-2.029-5.901-4.041-1.798 2.012-3.781 3.371-5.901 4.041-1.787.565-3.544.645-5.115.236-2.431-.634-4.14-2.27-4.811-4.498-.673-2.235-.189-4.83 1.365-8.237C3.532 17.809 7.758 9.124 9.712 5.294l.533-1.025C11.537 1.963 12.992 1 16 1zm0 2c-2.316 0-3.361.942-4.436 3.018l-.504.97C9.176 10.702 4.98 19.324 3.473 22.628c-1.332 2.92-1.636 4.962-1.127 6.654.512 1.7 1.83 2.946 3.738 3.444 1.258.328 2.68.257 4.144-.206 1.933-.611 3.812-1.921 5.642-3.896l.13-.142.13.142c1.83 1.975 3.709 3.285 5.642 3.896 1.464.463 2.886.534 4.144.206 1.908-.498 3.226-1.744 3.738-3.444.509-1.692.205-3.734-1.127-6.654-1.507-3.304-5.703-11.926-7.587-15.64l-.504-.97C19.361 3.942 18.316 3 16 3zm0 14c2.209 0 4 1.791 4 4 0 2.37-1.42 4.673-3.084 6.784-.306.388-.616.764-.916 1.116-.3-.352-.61-.728-.916-1.116C13.42 25.673 12 23.37 12 21c0-2.209 1.791-4 4-4zm0 2c-1.105 0-2 .895-2 2 0 1.574 1.055 3.328 2.298 4.96.488.64.957 1.218 1.38 1.705.423-.487.892-1.065 1.38-1.705C20.945 26.328 22 24.574 22 23c0-1.105-.895-2-2-2s-2 .895-2 2h-4c0-1.105-.895-2-2-2z" />
      </svg>
    </div>
  );
}

export function DialogLogo({
  className = "h-12 w-12",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-2xl bg-white p-2 shadow-sm border border-zinc-100 ${className}`}
    >
      <div className="flex flex-col items-center">
        <svg viewBox="0 0 100 60" className="h-6 w-10">
          <path d="M10 50 L50 10 L90 50 Z" fill="#EE2724" />
          <path d="M50 10 L90 50 L90 55 L50 25 Z" fill="#F8A51D" />
          <circle cx="50" cy="30" r="10" fill="#0072BC" />
        </svg>
        <span className="text-[10px] font-bold text-red-600 tracking-tight mt-0.5">
          Dialog
        </span>
      </div>
    </div>
  );
}

export function VirtusaLogo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-[#00529B] text-white font-bold text-xs shadow-sm ${className}`}
    >
      <span>V</span>
    </div>
  );
}

export function NinetyNineXLogo({
  className = "h-8 w-8",
}: {
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-emerald-600 text-white font-bold text-[10px] shadow-sm ${className}`}
    >
      <span>99x</span>
    </div>
  );
}

export function WSO2Logo({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center rounded-xl bg-[#F47B20] text-white font-bold text-[10px] shadow-sm ${className}`}
    >
      <span>WSO2</span>
    </div>
  );
}
