import Link from "next/link";
import { redirect } from "next/navigation";
import { DemoBanner } from "@/components/layout/DemoBanner";
import { Navbar, Footer } from "@/components/layout/Navbar";
import { BrutaCard, BrutaBadge, BrutaLink } from "@/components/ui/bruta";
import { DEMO_ACCOUNTS, HOME_BY_ROLE, getSession, loginAction } from "@/lib/session";

const input =
  "w-full rounded-xl border-[3px] border-black bg-white px-3 py-2 font-body text-sm font-medium text-black";

const accountColor: Record<string, string> = {
  ORGANIZER: "#8B5CF6",
  SPONSOR: "#FF6B1A",
  PLAYER: "#22D3EE",
};

const accountDesc: Record<string, string> = {
  ORGANIZER: "Buat turnamen, kelola bracket, ajukan proposal sponsor.",
  SPONSOR: "Telusuri proposal, danai acara, beli slot iklan UMKM.",
  PLAYER: "Daftar turnamen, cari tim lewat LFG, tonton stream.",
};

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const session = await getSession();
  const { next = "", error } = await searchParams;
  const safeNext = next.startsWith("/") ? next : "";

  if (session) {
    redirect(safeNext || HOME_BY_ROLE[session.role]);
  }

  return (
    <div className="flex min-h-full flex-1 flex-col bg-void text-cream">
      <DemoBanner />
      <Navbar />
      <main className="flex-1">
        <section className="halftone-dark grid-line-dark">
          <div className="mx-auto grid max-w-5xl gap-8 px-4 py-12 md:grid-cols-2 md:items-start">
            <div>
              <BrutaBadge color="#FF4D8D">Masuk / Login</BrutaBadge>
              <h1 className="mt-4 font-display text-3xl font-black leading-tight sm:text-4xl">
                MASUK KE <span className="text-sun">AKUN</span> KAMU
              </h1>
              <p className="mt-3 font-body text-sm text-mutedcream">
                Halaman publik bisa dilihat tanpa akun. Untuk memakai fitur
                (kelola turnamen, danai acara, cari tim), masuk dulu pakai salah
                satu akun demo di samping.
              </p>

              {error ? (
                <p className="mt-4 rounded-xl border-[3px] border-black bg-lose px-3 py-2 font-body text-sm font-bold text-white shadow-bruta-sm">
                  Akun tidak ditemukan. Pakai salah satu akun demo di samping.
                </p>
              ) : null}

              <BrutaCard className="mt-6 p-5">
                <form action={loginAction} className="space-y-3">
                  <input type="hidden" name="next" value={safeNext} />
                  <div>
                    <label className="font-display text-[11px] font-bold">EMAIL</label>
                    <input
                      name="email"
                      type="email"
                      required
                      defaultValue="bem@undip.ac.id"
                      className={input}
                    />
                  </div>
                  <div>
                    <label className="font-display text-[11px] font-bold">PASSWORD</label>
                    <input
                      name="password"
                      type="password"
                      defaultValue="demo123"
                      className={input}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bruta-press w-full cursor-pointer rounded-xl border-[3px] border-black bg-arena px-5 py-3 font-display text-sm font-bold uppercase tracking-wide text-white shadow-bruta"
                  >
                    Masuk →
                  </button>
                  <p className="font-body text-xs text-mutedcream">
                    Mode demo — password apa saja diterima, tidak ada autentikasi
                    sungguhan.
                  </p>
                </form>
              </BrutaCard>
            </div>

            <div>
              <h2 className="font-display text-lg font-black">
                MASUK CEPAT <span className="text-popcyan">SEBAGAI</span>
              </h2>
              <p className="mt-1 font-body text-xs text-mutedcream">
                Satu klik, langsung masuk pakai akun contoh tiap role.
              </p>
              <div className="mt-4 space-y-4">
                {DEMO_ACCOUNTS.map((a) => (
                  <form key={a.role} action={loginAction}>
                    <input type="hidden" name="email" value={a.email} />
                    <input type="hidden" name="next" value={safeNext} />
                    <button
                      type="submit"
                      className="bruta-press block w-full cursor-pointer rounded-2xl border-[3px] border-black bg-card p-4 text-left shadow-bruta"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <BrutaBadge color={accountColor[a.role]}>{a.label}</BrutaBadge>
                        <span className="font-display text-[11px] font-bold uppercase tracking-wide text-sun">
                          Masuk →
                        </span>
                      </div>
                      <p className="mt-2 font-display text-base font-black text-cream">
                        {a.name}
                      </p>
                      <p className="font-body text-xs text-mutedcream">{a.email}</p>
                      <p className="mt-2 font-body text-xs text-mutedcream">
                        {accountDesc[a.role]}
                      </p>
                    </button>
                  </form>
                ))}
              </div>

              <p className="mt-6 font-body text-xs text-mutedcream">
                Cuma mau lihat-lihat?{" "}
                <Link href="/" className="font-bold text-sun underline">
                  Balik ke beranda
                </Link>
              </p>
              <div className="mt-4">
                <BrutaLink href="/tournaments" variant="ghost" className="!px-3 !py-2 !text-xs">
                  Lihat Turnamen dulu
                </BrutaLink>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
