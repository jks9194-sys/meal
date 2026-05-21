import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { User, Edit2, AlertTriangle, BellRing, ChevronRight, Headphones, FileText, LogOut, Check, HeartCrack } from "lucide-react";

export default function ProfileView() {
  const [allergyAlert, setAllergyAlert] = useState(true);
  const [dailyAlert, setDailyAlert] = useState(false);
  const [showLogOutDialog, setShowLogOutDialog] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -15 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col gap-6 font-sans pb-16"
    >
      {/* Alert dialog modal for LogOut trigger */}
      <AnimatePresence>
        {showLogOutDialog && (
          <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white dark:bg-[#191c19] p-6 rounded-3xl max-w-[320px] w-full shadow-xl text-center border border-[#e1e3dd]/35"
            >
              <LogOut className="w-10 h-10 text-[#ba1a1a] mx-auto mb-3" />
              <h3 className="font-bold text-[16px] text-[#191c19] dark:text-white">로그아웃 하시겠습니까?</h3>
              <p className="text-[12px] text-[#444939] opacity-95 mt-1 leading-normal">
                씨마스고등학교 급식 서비스에서 안전하게 계정 로그아웃 처리됩니다.
              </p>
              <div className="flex gap-2.5 mt-5">
                <button
                  onClick={() => setShowLogOutDialog(false)}
                  className="flex-1 py-2.5 border border-[#e1e3dd] rounded-xl text-xs font-bold text-[#444939] hover:bg-[#f2f4ee]"
                >
                  취소
                </button>
                <button
                  onClick={() => {
                    setShowLogOutDialog(false);
                    alert("안전하게 로그아웃 되었습니다!");
                  }}
                  className="flex-1 py-2.5 bg-[#ba1a1a] text-white rounded-xl text-xs font-bold hover:bg-[#ba1a1a]/95"
                >
                  로그아웃
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Profile Card Bento Style */}
      <section className="bg-white dark:bg-[#191c19] rounded-[24px] p-5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] flex items-center justify-between relative overflow-hidden border border-[#e1e3dd]/35">
        <div className="absolute -right-6 -top-6 w-24 h-24 bg-gradient-to-br from-[#dde8b2] to-transparent opacity-40 rounded-full blur-xl pointer-events-none"></div>

        <div className="flex items-center gap-4 relative z-10">
          <div className="w-[64px] h-[64px] rounded-full overflow-hidden border-4 border-[#f2f4ee] shadow-sm">
            <img
              alt="Student Profile Avatar"
              className="w-full h-full object-cover"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuAFq4nVrlJSAl-gz4VWFqInkFUnTsh5PXMfq4uvBQVRKKcBzaziGKsXczvT9aqYK7ClgQNak8fD_yoNESRTFyRxOISWksvEHfY6dBFm3U7aZDfVFKzyR3AIKpHZPNC8LGyvS0EmvFrWRP96XzWUMcvU5gOthkXy9vSn-3D8JTkK_J6fLAkX09P6JG6grMdWCERzUacO2pJDiNc3ZLtrRvUhySa-0NW5lpbpcgt47S0UcyOoTrsMLuseKxDFWwZy-Ct4afmVo5cIrtc"
              referrerPolicy="no-referrer"
            />
          </div>
          <div>
            <h2 className="text-[18px] font-bold text-[#3c5500] dark:text-[#add463] flex items-center gap-1.5 leading-none">
              김학생
              <Check className="w-4 h-4 text-[#3c5500]/75 bg-[#dde8b2] rounded-full p-[2px]" />
            </h2>
            <p className="text-[12px] text-[#444939] dark:text-[#c4c9b4] mt-[5px] font-medium font-sans">
              2학년 3반 15번
            </p>
          </div>
        </div>

        <button
          onClick={() => alert("프로필 편정 메뉴는 현재 읽기 전용 모드입니다.")}
          className="w-[36px] h-[36px] rounded-full bg-[#f2f4ee] hover:bg-[#e1e3dd] cursor-pointer flex items-center justify-center text-[#3c5500] transition-colors shadow-sm active:translate-y-[1px]"
        >
          <Edit2 className="w-[16px] h-[16px]" />
        </button>
      </section>

      {/* Settings Grid Group */}
      <section className="flex flex-col gap-4">
        <h3 className="text-[12px] font-bold text-[#444939] dark:text-[#c4c9b4] uppercase tracking-wider pl-1.5 mb-1 text-left">
          계정 설정
        </h3>

        {/* Allergen check panel */}
        <div className="bg-white dark:bg-[#191c19] rounded-[24px] p-4.5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex flex-col gap-3.5">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-full bg-[#ffdad6] flex items-center justify-center text-[#ba1a1a]">
                <AlertTriangle className="w-[16px] h-[16px] stroke-[2.5]" />
              </div>
              <span className="text-[14px] font-bold text-[#191c19] dark:text-[#eff1eb]">
                알레르기 경고 알림
              </span>
            </div>

            {/* Custom Toggle Switch */}
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                className="sr-only peer"
                checked={allergyAlert}
                onChange={() => setAllergyAlert(!allergyAlert)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c5500]"></div>
            </label>
          </div>

          <div className="flex gap-2 pl-11">
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dde8b2]/70 text-[#3c5500] text-[11px] font-bold border border-[#c1cc98]/20">
              우유
            </span>
            <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#dde8b2]/70 text-[#3c5500] text-[11px] font-bold border border-[#c1cc98]/20">
              땅콩
            </span>
          </div>
        </div>

        {/* Daily meal notification */}
        <div
          onClick={() => setDailyAlert(!dailyAlert)}
          className="bg-white dark:bg-[#191c19] rounded-[24px] p-4.5 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex justify-between items-center cursor-pointer transition-colors hover:bg-gray-50/60"
        >
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-[#d2ea7a]/30 flex items-center justify-center text-[#536500]">
              <BellRing className="w-[16px] h-[16px] stroke-[2.5]" />
            </div>
            <span className="text-[14px] font-bold text-[#191c19] dark:text-[#eff1eb]">
              일일 식단 알림
            </span>
          </div>

          <label className="relative inline-flex items-center cursor-pointer" onClick={(e) => e.stopPropagation()}>
            <input
              type="checkbox"
              className="sr-only peer"
              checked={dailyAlert}
              onChange={() => setDailyAlert(!dailyAlert)}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full dark:bg-gray-700 peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c5500]"></div>
          </label>
        </div>
      </section>

      {/* Support Settings Grid */}
      <section className="flex flex-col gap-3">
        <h3 className="text-[12px] font-bold text-[#444939] dark:text-[#c4c9b4] uppercase tracking-wider pl-1.5 mb-1 text-left">
          지원 및 정보
        </h3>

        {/* Customer Service */}
        <div
          onClick={() => alert("체험판 앱에서는 가상 고객센터 연결을 지원합니다.")}
          className="bg-white dark:bg-[#191c19] rounded-[24px] p-4 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex justify-between items-center transition-all hover:bg-gray-50 active:translate-y-[1px] cursor-pointer"
        >
          <div className="flex items-center gap-3 pl-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-[#444939]">
              <Headphones className="w-[16px] h-[16px]" />
            </div>
            <span className="text-[13px] font-bold text-[#191c19] dark:text-[#eff1eb]">고객센터</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#444939]" />
        </div>

        {/* Terms */}
        <div
          onClick={() => alert("비영리 소규모 체험 교육용 소프트웨어 이용약관이 적용됩니다.")}
          className="bg-white dark:bg-[#191c19] rounded-[24px] p-4 shadow-[0px_4px_20px_rgba(79,111,0,0.06)] border border-[#e1e3dd]/35 flex justify-between items-center transition-all hover:bg-gray-50 active:translate-y-[1px] cursor-pointer"
        >
          <div className="flex items-center gap-3 pl-1">
            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-900 flex items-center justify-center text-[#444939]">
              <FileText className="w-[16px] h-[16px]" />
            </div>
            <span className="text-[13px] font-bold text-[#191c19] dark:text-[#eff1eb]">이용약관</span>
          </div>
          <ChevronRight className="w-4 h-4 text-[#444939]" />
        </div>
      </section>

      {/* Logout button */}
      <button
        onClick={() => setShowLogOutDialog(true)}
        className="w-full bg-[#f2f4ee] hover:bg-[#ffdad6] hover:text-[#ba1a1a] rounded-[24px] py-4 flex justify-center items-center gap-2 text-gray-700 font-bold transition-colors active:translate-y-[1px] text-[14px]"
      >
        <LogOut className="w-[18px] h-[18px] stroke-[2.5]" />
        <span>로그아웃</span>
      </button>

      {/* Footer copyright */}
      <footer className="mt-4 text-center pb-8 opacity-80 pl-0.5">
        <p className="text-[12px] text-[#444939] font-medium opacity-70">
          © 2026 씨마스고등학교 급식
        </p>
        <p className="text-[11px] text-[#444939] opacity-65 mt-1 leading-normal font-sans">
          건강하고 맛있는 학교 식단을 지원합니다.
        </p>
      </footer>
    </motion.div>
  );
}
