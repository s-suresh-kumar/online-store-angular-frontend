import { FormControl, ValidationErrors } from "@angular/forms";

export class DeepDiscountShoppingValidators {
      // whitespace validation
      static justBlank(control: FormControl) : ValidationErrors | null {
        
        // check if string only contains whitespace
        if ((control.value != null) && (control.value.trim().length === 0)) {

            // invalid, return error object
            return { 'justBlank': true };
        }
        else {
            // valid, return null
            return null;
        }
    }
}
