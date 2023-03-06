import validator from "validator";

class CommonValidators {
  public checkIsValidASCII(input: unknown): boolean {
    if (input && validator.isAscii(String(input))) {
      return true;
    }
    return false;
  }

  public checkIsWholeNumber(inputString: unknown, min: number = 0, max?: number): boolean {
    let options;
    if (max !== undefined) {
      options = { min, max };
    }  else {
      options = { min };
    }

    if (inputString && validator.isInt(String(inputString), options)) {
      return true;
    }
    return false;
  }

  public checkIsFloat(input: unknown, min?: number, max?: number): boolean {
    let options;
    if (min !== undefined && max !== undefined) {
      options = { min, max };
    } else if (max !== undefined) {
      options = { max };
    } else {
      options = { min };
    }
    if (input !== undefined && validator.isFloat(String(input), options)) {
      return true;
    }
    return false;
  }

  public checkIsValidISO(input: unknown): boolean {
    if (input && validator.isISO8601(String(input))) {
      return true;
    }
    return false;
  }

  public checkIsValidDateTimeDifference(inputStartTime: unknown, inputEndTime: unknown): boolean {
    if (!inputStartTime || !inputEndTime) {
      return false;
    }

    if (new Date(String(inputEndTime)) < new Date(String(inputStartTime))) {
      return false;
    }

    return true;
  }

  public isParamsValid(input: unknown[]): boolean {
    const hasInvalidParams = input.some(obj => obj === undefined || obj === null);
    // for valid scenario - return true if inputs do not have errors
    // hence negating the value.
    return !hasInvalidParams;
  }

  public validateIntegerArray(input: unknown[]) {
    return input.every(obj => this.checkIsWholeNumber(obj));
  }

  public checkParmsInEnums(inputEnum: object, lookup: unknown) {
    return Object.values(inputEnum).includes(String(lookup));
  }

  public validateStringArray(input: unknown[]) {
    return input.every(obj => this.checkIsValidASCII(obj));
  }

  public validateEnumArray(inputEnum: object, input: unknown[]) {
    return input.every(obj => this.checkParmsInEnums(inputEnum, obj));
  }
}

const commonValidators = new CommonValidators();
export { commonValidators };
