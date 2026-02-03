import { Input } from './ui/input';

interface NameEditorProps {
  title: string;
  names: string;
  onTitleChange: (title: string) => void;
  onNamesChange: (names: string) => void;
}

export const NameEditor = ({ title, names, onTitleChange, onNamesChange }: NameEditorProps) => {
  return (
    <div className="glass-card rounded-2xl p-4 space-y-3">
      <h3 className="text-sm font-semibold text-foreground flex items-center gap-2">
        <span>💌</span> Personalize
      </h3>
      <div className="space-y-2">
        <Input
          placeholder="Title (e.g., Pink Photo Booth)"
          value={title}
          onChange={(e) => onTitleChange(e.target.value)}
          className="bg-white/70 border-pink-200 focus:border-primary"
        />
        <Input
          placeholder="Names (e.g., Jhams & Crush 💘)"
          value={names}
          onChange={(e) => onNamesChange(e.target.value)}
          className="bg-white/70 border-pink-200 focus:border-primary"
        />
      </div>
    </div>
  );
};
