import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React from "react";

function DropdownField(item) {
  return (
    <div>
      <Select>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={item.item.label} />
        </SelectTrigger>
        <SelectContent>
          {item?.item?.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export default DropdownField;
