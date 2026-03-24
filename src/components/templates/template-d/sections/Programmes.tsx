import Link from "next/link";
import { DEPARTMENTS } from "@/lib/constants";
import { ArrowRight } from "lucide-react";

export default function ProgrammesD() {
  return (
    <section className="py-16 px-4">
      <div className="max-w-6xl mx-auto">
        <span className="text-[11px] tracking-[0.15em] uppercase text-[#b91c1c] font-semibold">
          Programmes Offered
        </span>
        <h2 className="font-playfair text-3xl font-bold text-[#1a1a1a] mt-3 mb-8">
          Academic Catalogue
        </h2>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-[#1a1a1a]">
                <th className="text-left py-3 text-[11px] tracking-[0.1em] uppercase text-[#78716c] font-semibold">Programme</th>
                <th className="text-left py-3 text-[11px] tracking-[0.1em] uppercase text-[#78716c] font-semibold w-20">Type</th>
                <th className="text-right py-3 text-[11px] tracking-[0.1em] uppercase text-[#78716c] font-semibold w-32">Fees / Sem</th>
              </tr>
            </thead>
            <tbody>
              {DEPARTMENTS.map((dept, i) => (
                <tr
                  key={dept.name}
                  className={`border-b border-[#d6d3d1] hover:bg-[#b91c1c]/5 transition-colors cursor-pointer ${i % 2 === 1 ? "bg-[#f5f5f4]" : ""}`}
                >
                  <td className="py-3.5 text-[#1a1a1a] font-medium">{dept.name}</td>
                  <td className="py-3.5 text-[#78716c]">{dept.type}</td>
                  <td className="py-3.5 text-right text-[#78716c]">{dept.fees}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-6">
          <Link href="/academics" className="inline-flex items-center gap-2 text-sm text-[#b91c1c] hover:text-[#991b1b] transition-colors">
            View full academic catalogue <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="h-px bg-[#d6d3d1] mt-10" />
      </div>
    </section>
  );
}
