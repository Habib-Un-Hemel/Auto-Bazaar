import { Input } from "@/components/ui/input";
import React from "react";

function InputField(item) {
  return (

    (
      <div>
        <Input type={item?.item?.fieldType} name={item?.item?.name} required={item?.item?.required} />
      </div>
    )
  );
}

export default InputField;