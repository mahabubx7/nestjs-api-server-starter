import 'dotenv/config';

/*
|--------------------------------------------------------------------------
| Freindly Environment Variables
| @envParser => parse and validate environment variables with type safety
|--------------------------------------------------------------------------
*/

const loadVariables = () => {
  return process.env as Record<string, string>;
};

export const envRawVars = loadVariables();

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const rules = [
  'required',
  'nullable',
  'boolean',
  'number',
  'string',
  'unsigned',
  // 'url',
  // 'uri',
  'ipv4',
  'ipv6',
] as const;

type Rules = (typeof rules)[number][];

export const envParser = {
  get: <T = string>(key: string, rules: Rules = ['string'], df?: T) => {
    let value = envRawVars[key] as unknown;

    if (rules.includes('required') && (!value || value === '')) {
      throw new Error(`Environment variable ${key} is required.`);
    }

    if (rules.includes('nullable') && (value === '' || !value)) {
      value = null;
    }

    if (
      (!value || value === '') &&
      !rules.includes('required') &&
      !rules.includes('nullable') &&
      !rules.includes('boolean')
    ) {
      if (!df) throw new Error(`Default value is missing for ${key}`);
      value = df;
    }

    if (rules.includes('boolean')) {
      if (typeof value === 'string') value = (value as string).toLowerCase();
      if (value === 'true' || value === '1') value = true;
      else value = false;
    }

    if (rules.includes('number')) {
      value = Number(value);
    }

    if (rules.includes('unsigned')) {
      value = Number(value);
      if ((value as number) < 0) {
        throw new Error(
          `Environment variable "${key}" must be an unsigned number'`,
        );
      }
    }

    // HAVE ISSUES WITH URL AND URI ......................
    // if (rules.includes('url')) {
    //   const urlMatcher = /^(http|https):\/\/[^ "]+$/;
    //   if (!urlMatcher.test(value as string)) {
    //     throw new Error(`Environment variable ${key} must be a valid URL`);
    //   }
    // }

    // if (rules.includes('uri')) {
    //   const uriMatcher = /^[a-zA-Z0-9]+:\/\/[a-zA-Z0-9-.@%&\-_+$#]+$/;
    //   if (!uriMatcher.test(value as string)) {
    //     throw new Error(`Environment variable ${key} must be a valid URI`);
    //   }
    // }

    if (rules.includes('ipv4')) {
      // ipv4 regex
      const regex = /\d{1,4}.\d{1,4}.\d{1,4}.\d{1,4}/; // IPv4 regex
      const part = (value as string).split('://');
      let address: string = '';
      if ((value as string).includes('://')) {
        address = (part[1] as string).split(':')[0];
      } else {
        address = (part[0] as string).split(':')[0];
      }
      if (!regex.test(address)) {
        throw new Error(`Environment variable ${key} must be a valid IPv4`);
      }
    }

    if (rules.includes('ipv6')) {
      const regex = /^(?:[a-fA-F0-9]{1,4}:){7}[a-fA-F0-9]{1,4}$/; // IPv6 regex
      const part = (value as string).split('://');
      let address: string = '';
      if ((value as string).includes('://')) {
        address = (part[1] as string).split(':')[0];
      } else {
        address = (part[0] as string).split(':')[0];
      }
      if (!regex.test(address)) {
        throw new Error(`Environment variable ${key} must be a valid IPv6`);
      }
    }

    if (rules.includes('string')) {
      value = value as string;
    }

    return value as unknown as T;
  },
};
