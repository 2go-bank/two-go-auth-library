import { useState } from 'react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { HexColorPicker } from "react-colorful";

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

const ColorPicker = ({ label, value, onChange }: ColorPickerProps) => {
  const [showPicker, setShowPicker] = useState(false);

  return (
    <div className="space-y-2">
      <Label>{label}</Label>
      <div className="flex gap-2">
        <Input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="flex-1"
        />
        <div className="relative">
          <div
            className="w-10 h-10 border border-gray-300 rounded cursor-pointer"
            style={{ backgroundColor: value }}
            onClick={() => setShowPicker(!showPicker)}
          />
          {showPicker && (
            <div className="absolute z-10 mt-2">
              <div 
                className="fixed inset-0" 
                onClick={() => setShowPicker(false)}
              />
              <HexColorPicker
                color={value}
                onChange={onChange}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ColorPicker;