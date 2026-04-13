import Link from "next/link";
import { FileText, CreditCard, Download, ClipboardList } from "lucide-react";

const defaultActions = [
  {
    icon: FileText,
    label: "Apply Online",
    description: "Submit your application for admission",
    href: "/admissions/apply",
    color: "bg-primary",
  },
  {
    icon: CreditCard,
    label: "Pay Fees",
    description: "Online fee payment portal",
    href: "/admissions/fees",
    color: "bg-primary-light",
  },
  {
    icon: Download,
    label: "Prospectus",
    description: "Download college prospectus",
    href: "/admissions/prospectus",
    color: "bg-accent",
  },
  {
    icon: ClipboardList,
    label: "Exam Results",
    description: "Check your examination results",
    href: "/examination/results",
    color: "bg-success",
  },
];

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText, CreditCard, Download, ClipboardList,
};

type Props = {
  buttons?: { label: string; description?: string; href: string; icon?: string; color?: string }[];
};

export default function QuickAccess({ buttons }: Props) {
  const actions = buttons
    ? buttons.map((b) => ({
        icon: iconMap[b.icon || ""] || FileText,
        label: b.label,
        description: b.description || "",
        href: b.href,
        color: b.color || "bg-primary",
      }))
    : defaultActions;
  return (
    <section className="py-8 bg-[#f8f6f0] relative z-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {actions.map(({ icon: Icon, label, description, href, color }) => (
            <Link
              key={label}
              href={href}
              className="group bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 p-5 flex items-start gap-4 border border-border/50 hover:-translate-y-1"
            >
              <div className={`${color} w-12 h-12 rounded-lg flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground text-sm">{label}</h3>
                <p className="text-xs text-muted mt-0.5 hidden sm:block">{description}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
