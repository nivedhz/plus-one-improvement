import {
  Atom,
  BookOpen,
  Bug,
  Cpu,
  FlaskConical,
  Languages,
  Sigma,
  Sprout,
} from "lucide-react";

const MAP: Record<string, typeof Atom> = {
  physics: Atom,
  chemistry: FlaskConical,
  mathematics: Sigma,
  english: BookOpen,
  malayalam: Languages,
  "computer-science": Cpu,
  zoology: Bug,
  botany: Sprout,
};

export default function SubjectIcon({
  slug,
  size = 20,
}: {
  slug: string;
  size?: number;
}) {
  const Icon = MAP[slug] ?? BookOpen;
  return <Icon size={size} aria-hidden />;
}
