/* eslint-disable */
/* tslint:disable */
// @ts-nocheck
/*
 * ---------------------------------------------------------------
 * ## THIS FILE WAS GENERATED VIA SWAGGER-TYPESCRIPT-API        ##
 * ##                                                           ##
 * ## AUTHOR: acacode                                           ##
 * ## SOURCE: https://github.com/acacode/swagger-typescript-api ##
 * ---------------------------------------------------------------
 */

export interface ChemicalProcessInCalculationUpdate {
  /**
   * Quantity
   * @min -2147483648
   * @max 2147483647
   */
  quantity?: number;
  /**
   * Calculation result
   * @format decimal
   */
  calculation_result?: string | null;
}

export interface ChemicalProcessInCalculationDelete {
  /** Calculation id */
  calculation_id: number;
  /** Process id */
  process_id: number;
}

export interface ChemicalProcess {
  /** ID */
  id?: number;
  /**
   * Name
   * @minLength 1
   * @maxLength 200
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Input reagent
   * @minLength 1
   * @maxLength 100
   */
  input_reagent: string;
  /**
   * Output product
   * @minLength 1
   * @maxLength 100
   */
  output_product: string;
  /**
   * Input mass
   * @format decimal
   */
  input_mass: string;
  /**
   * Output mass
   * @format decimal
   */
  output_mass: string;
  /**
   * Yield percent
   * @format decimal
   */
  yield_percent: string;
  /**
   * Image
   * @format uri
   * @maxLength 200
   */
  image?: string | null;
  /**
   * Reaction equation
   * @minLength 1
   */
  reaction_equation: string;
  /**
   * Parameter name
   * @minLength 1
   * @maxLength 100
   */
  parameter_name: string;
  /**
   * Parameter unit
   * @minLength 1
   * @maxLength 20
   */
  parameter_unit: string;
  /**
   * Parameter min
   * @format decimal
   */
  parameter_min: string;
  /**
   * Parameter max
   * @format decimal
   */
  parameter_max: string;
  /**
   * Parameter default
   * @format decimal
   */
  parameter_default: string;
  /** Is active */
  is_active?: boolean;
}

export interface ChemicalProcessCreate {
  /**
   * Name
   * @minLength 1
   * @maxLength 200
   */
  name: string;
  /**
   * Description
   * @minLength 1
   */
  description: string;
  /**
   * Input reagent
   * @minLength 1
   * @maxLength 100
   */
  input_reagent: string;
  /**
   * Output product
   * @minLength 1
   * @maxLength 100
   */
  output_product: string;
  /**
   * Input mass
   * @format decimal
   */
  input_mass: string;
  /**
   * Output mass
   * @format decimal
   */
  output_mass: string;
  /**
   * Yield percent
   * @format decimal
   */
  yield_percent: string;
  /**
   * Reaction equation
   * @minLength 1
   */
  reaction_equation: string;
  /**
   * Parameter name
   * @minLength 1
   * @maxLength 100
   */
  parameter_name: string;
  /**
   * Parameter unit
   * @minLength 1
   * @maxLength 20
   */
  parameter_unit: string;
  /**
   * Parameter min
   * @format decimal
   */
  parameter_min: string;
  /**
   * Parameter max
   * @format decimal
   */
  parameter_max: string;
  /**
   * Parameter default
   * @format decimal
   */
  parameter_default: string;
}

export interface ChemicalProcessImage {
  /**
   * Image
   * @format uri
   * @maxLength 200
   */
  image?: string | null;
}

export interface ReagentCalculationList {
  /** ID */
  id?: number;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /**
   * Creation datetime
   * @format date-time
   */
  creation_datetime?: string;
  /**
   * Formation datetime
   * @format date-time
   */
  formation_datetime?: string | null;
  /**
   * Completion datetime
   * @format date-time
   */
  completion_datetime?: string | null;
  /** Client */
  client?: number;
  /**
   * Client username
   * @minLength 1
   */
  client_username?: string;
  /** Manager */
  manager?: number | null;
  /**
   * Manager username
   * @minLength 1
   */
  manager_username?: string;
  /**
   * Target mass
   * @format decimal
   */
  target_mass: string;
  /**
   * Safety factor
   * @format decimal
   */
  safety_factor?: string;
  /**
   * Calculation date
   * @format date
   */
  calculation_date: string;
  /**
   * Total input mass
   * @format decimal
   */
  total_input_mass?: string | null;
  /**
   * Results quantity
   * @min -2147483648
   * @max 2147483647
   */
  results_quantity?: number | null;
}

export interface CartIcon {
  /** Calculation id */
  calculation_id: number;
  /** Processes count */
  processes_count: number;
}

export interface ChemicalProcessInCalculation {
  /** ID */
  id?: number;
  /** Calculation */
  calculation?: number;
  /** Process */
  process: number;
  /**
   * Process name
   * @minLength 1
   */
  process_name?: string;
  /**
   * Process image
   * @minLength 1
   */
  process_image?: string;
  /**
   * Quantity
   * @min -2147483648
   * @max 2147483647
   */
  quantity?: number;
  /**
   * Calculation result
   * @format decimal
   */
  calculation_result?: string | null;
}

export interface ReagentCalculationDetail {
  /** ID */
  id?: number;
  /** Status */
  status?: "DRAFT" | "DELETED" | "FORMED" | "COMPLETED" | "REJECTED";
  /**
   * Creation datetime
   * @format date-time
   */
  creation_datetime?: string;
  /**
   * Formation datetime
   * @format date-time
   */
  formation_datetime?: string | null;
  /**
   * Completion datetime
   * @format date-time
   */
  completion_datetime?: string | null;
  /** Client */
  client?: number;
  /**
   * Client username
   * @minLength 1
   */
  client_username?: string;
  /** Manager */
  manager?: number | null;
  /**
   * Manager username
   * @minLength 1
   */
  manager_username?: string;
  /**
   * Target mass
   * @format decimal
   */
  target_mass: string;
  /**
   * Safety factor
   * @format decimal
   */
  safety_factor?: string;
  /**
   * Calculation date
   * @format date
   */
  calculation_date: string;
  /**
   * Total input mass
   * @format decimal
   */
  total_input_mass?: string | null;
  results_quantity?: number;
  processes?: ChemicalProcessInCalculation[];
}

export interface ReagentCalculationCreate {
  /**
   * Target mass
   * @format decimal
   */
  target_mass: string;
  /**
   * Safety factor
   * @format decimal
   */
  safety_factor?: string;
  /**
   * Calculation date
   * @format date
   */
  calculation_date: string;
}

export interface UserLogin {
  /**
   * Username
   * @minLength 1
   */
  username: string;
  /**
   * Password
   * @minLength 1
   */
  password: string;
}

export interface UserProfile {
  /** ID */
  id?: number;
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   */
  username?: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Date joined
   * @format date-time
   */
  date_joined?: string;
}

export interface UserRegistration {
  /**
   * Username
   * Required. 150 characters or fewer. Letters, digits and @/./+/-/_ only.
   * @minLength 1
   * @maxLength 150
   * @pattern ^[\w.@+-]+$
   */
  username: string;
  /**
   * Email address
   * @format email
   * @maxLength 254
   */
  email?: string;
  /**
   * First name
   * @maxLength 150
   */
  first_name?: string;
  /**
   * Last name
   * @maxLength 150
   */
  last_name?: string;
  /**
   * Password
   * @minLength 6
   */
  password: string;
  /**
   * Password confirm
   * @minLength 1
   */
  password_confirm: string;
}

import type {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  HeadersDefaults,
  ResponseType,
} from "axios";
import axios from "axios";

export type QueryParamsType = Record<string | number, any>;

export interface FullRequestParams
  extends Omit<AxiosRequestConfig, "data" | "params" | "url" | "responseType"> {
  /** set parameter to `true` for call `securityWorker` for this request */
  secure?: boolean;
  /** request path */
  path: string;
  /** content type of request body */
  type?: ContentType;
  /** query params */
  query?: QueryParamsType;
  /** format of response (i.e. response.json() -> format: "json") */
  format?: ResponseType;
  /** request body */
  body?: unknown;
}

export type RequestParams = Omit<
  FullRequestParams,
  "body" | "method" | "query" | "path"
>;

export interface ApiConfig<SecurityDataType = unknown>
  extends Omit<AxiosRequestConfig, "data" | "cancelToken"> {
  securityWorker?: (
    securityData: SecurityDataType | null,
  ) => Promise<AxiosRequestConfig | void> | AxiosRequestConfig | void;
  secure?: boolean;
  format?: ResponseType;
}

export enum ContentType {
  Json = "application/json",
  JsonApi = "application/vnd.api+json",
  FormData = "multipart/form-data",
  UrlEncoded = "application/x-www-form-urlencoded",
  Text = "text/plain",
}

export class HttpClient<SecurityDataType = unknown> {
  public instance: AxiosInstance;
  private securityData: SecurityDataType | null = null;
  private securityWorker?: ApiConfig<SecurityDataType>["securityWorker"];
  private secure?: boolean;
  private format?: ResponseType;

  constructor({
    securityWorker,
    secure,
    format,
    ...axiosConfig
  }: ApiConfig<SecurityDataType> = {},
    externalInstance?: AxiosInstance) {
    this.instance = externalInstance || axios.create({
      ...axiosConfig,
      baseURL: axiosConfig.baseURL || "http://localhost:8000/api",
    });
    this.secure = secure;
    this.format = format;
    this.securityWorker = securityWorker;
  }

  public setSecurityData = (data: SecurityDataType | null) => {
    this.securityData = data;
  };

  protected mergeRequestParams(
    params1: AxiosRequestConfig,
    params2?: AxiosRequestConfig,
  ): AxiosRequestConfig {
    const method = params1.method || (params2 && params2.method);

    return {
      ...this.instance.defaults,
      ...params1,
      ...(params2 || {}),
      headers: {
        ...((method &&
          this.instance.defaults.headers[
            method.toLowerCase() as keyof HeadersDefaults
          ]) ||
          {}),
        ...(params1.headers || {}),
        ...((params2 && params2.headers) || {}),
      },
    };
  }

  protected stringifyFormItem(formItem: unknown) {
    if (typeof formItem === "object" && formItem !== null) {
      return JSON.stringify(formItem);
    } else {
      return `${formItem}`;
    }
  }

  protected createFormData(input: Record<string, unknown>): FormData {
    if (input instanceof FormData) {
      return input;
    }
    return Object.keys(input || {}).reduce((formData, key) => {
      const property = input[key];
      const propertyContent: any[] =
        property instanceof Array ? property : [property];

      for (const formItem of propertyContent) {
        const isFileType = formItem instanceof Blob || formItem instanceof File;
        formData.append(
          key,
          isFileType ? formItem : this.stringifyFormItem(formItem),
        );
      }

      return formData;
    }, new FormData());
  }

  public request = async <T = any, _E = any>({
    secure,
    path,
    type,
    query,
    format,
    body,
    ...params
  }: FullRequestParams): Promise<AxiosResponse<T>> => {
    const secureParams =
      ((typeof secure === "boolean" ? secure : this.secure) &&
        this.securityWorker &&
        (await this.securityWorker(this.securityData))) ||
      {};
    const requestParams = this.mergeRequestParams(params, secureParams);
    const responseFormat = format || this.format || undefined;

    if (
      type === ContentType.FormData &&
      body &&
      body !== null &&
      typeof body === "object"
    ) {
      body = this.createFormData(body as Record<string, unknown>);
    }

    if (
      type === ContentType.Text &&
      body &&
      body !== null &&
      typeof body !== "string"
    ) {
      body = JSON.stringify(body);
    }

    return this.instance.request({
      ...requestParams,
      headers: {
        ...(requestParams.headers || {}),
        ...(type ? { "Content-Type": type } : {}),
      },
      params: query,
      responseType: responseFormat,
      data: body,
      url: path,
    });
  };
}

/**
 * @title IRC API
 * @version v1
 * @license BSD License
 * @termsOfService https://www.google.com/policies/terms/
 * @baseUrl http://localhost:8000/api
 * @contact <vladK@bmstu.ru>
 *
 * API description
 */
export class Api<
  SecurityDataType extends unknown,
> extends HttpClient<SecurityDataType> {
  calculationProcesses = {
    /**
     * @description Обновить связь химического процесса в заявке
     *
     * @tags calculation-processes
     * @name CalculationProcessesUpdate
     * @request PUT:/calculation-processes/
     * @secure
     */
    calculationProcessesUpdate: (
      data: ChemicalProcessInCalculationUpdate,
      params: RequestParams = {},
    ) =>
      this.request<ChemicalProcessInCalculationUpdate, void>({
        path: `/calculation-processes/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить химический процесс из заявки
     *
     * @tags calculation-processes
     * @name CalculationProcessesDeleteDelete
     * @request DELETE:/calculation-processes/delete/
     * @secure
     */
    calculationProcessesDeleteDelete: (
      data: ChemicalProcessInCalculationDelete,
      params: RequestParams = {},
    ) =>
      this.request<void, void>({
        path: `/calculation-processes/delete/`,
        method: "DELETE",
        body: data,
        secure: true,
        type: ContentType.Json,
        ...params,
      }),
  };
  chemicalProcesses = {
    /**
     * @description Получить список химических процессов с фильтрацией
     *
     * @tags chemical-processes
     * @name ChemicalProcessesList
     * @request GET:/chemical-processes/
     * @secure
     */
    chemicalProcessesList: (
      query?: {
        /** Поиск по названию */
        search?: string;
        /** Мин. входная масса */
        min_mass?: number;
        /** Макс. входная масса */
        max_mass?: number;
      },
      params: RequestParams = {},
    ) =>
      this.request<ChemicalProcess[], any>({
        path: `/chemical-processes/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Создать новый химический процесс
     *
     * @tags chemical-processes
     * @name ChemicalProcessesCreate
     * @request POST:/chemical-processes/
     * @secure
     */
    chemicalProcessesCreate: (
      data: ChemicalProcessCreate,
      params: RequestParams = {},
    ) =>
      this.request<ChemicalProcessCreate, void>({
        path: `/chemical-processes/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить детали химического процесса по ID
     *
     * @tags chemical-processes
     * @name ChemicalProcessesRead
     * @request GET:/chemical-processes/{id}/
     * @secure
     */
    chemicalProcessesRead: (id: string, params: RequestParams = {}) =>
      this.request<ChemicalProcess, any>({
        path: `/chemical-processes/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновить химический процесс
     *
     * @tags chemical-processes
     * @name ChemicalProcessesUpdate
     * @request PUT:/chemical-processes/{id}/
     * @secure
     */
    chemicalProcessesUpdate: (
      id: string,
      data: ChemicalProcessCreate,
      params: RequestParams = {},
    ) =>
      this.request<ChemicalProcessCreate, void>({
        path: `/chemical-processes/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить химический процесс (деактивация)
     *
     * @tags chemical-processes
     * @name ChemicalProcessesDelete
     * @request DELETE:/chemical-processes/{id}/
     * @secure
     */
    chemicalProcessesDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, any>({
        path: `/chemical-processes/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Добавить химический процесс в корзину (заявку-черновик)
     *
     * @tags chemical-processes
     * @name ChemicalProcessesAddToCartCreate
     * @request POST:/chemical-processes/{id}/add-to-cart/
     * @secure
     */
    chemicalProcessesAddToCartCreate: (
      id: number,
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          calculation_id?: number;
          processes_count?: number;
          created_new_calculation?: boolean;
        },
        any
      >({
        path: `/chemical-processes/${id}/add-to-cart/`,
        method: "POST",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Добавить/изменить изображение для химического процесса
     *
     * @tags chemical-processes
     * @name ChemicalProcessesImageCreate
     * @request POST:/chemical-processes/{id}/image/
     * @secure
     */
    chemicalProcessesImageCreate: (
      id: string,
      data: ChemicalProcessImage,
      params: RequestParams = {},
    ) =>
      this.request<ChemicalProcessImage, void>({
        path: `/chemical-processes/${id}/image/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
  reagentCalculations = {
    /**
     * @description Получить список заявок на расчет реагентов
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsList
     * @request GET:/reagent_calculations/
     * @secure
     */
    reagentCalculationsList: (
      query?: {
        /** Фильтр по статусу */
        status?: string;
        /** Дата от (YYYY-MM-DD) */
        date_from?: string;
        /** Дата до (YYYY-MM-DD) */
        date_to?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReagentCalculationList[], any>({
        path: `/reagent_calculations/`,
        method: "GET",
        query: query,
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить информацию о корзине (количество процессов в черновике)
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsCartIconList
     * @request GET:/reagent_calculations/cart-icon/
     * @secure
     */
    reagentCalculationsCartIconList: (params: RequestParams = {}) =>
      this.request<CartIcon, any>({
        path: `/reagent_calculations/cart-icon/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить детали заявки на расчет реагентов
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsRead
     * @request GET:/reagent_calculations/{id}/
     * @secure
     */
    reagentCalculationsRead: (id: number, params: RequestParams = {}) =>
      this.request<ReagentCalculationDetail, any>({
        path: `/reagent_calculations/${id}/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновить заявку на расчет реагентов
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsUpdate
     * @request PUT:/reagent_calculations/{id}/
     * @secure
     */
    reagentCalculationsUpdate: (
      id: string,
      data: ReagentCalculationCreate,
      params: RequestParams = {},
    ) =>
      this.request<ReagentCalculationDetail, void>({
        path: `/reagent_calculations/${id}/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Удалить заявку на расчет реагентов
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsDelete
     * @request DELETE:/reagent_calculations/{id}/
     * @secure
     */
    reagentCalculationsDelete: (id: string, params: RequestParams = {}) =>
      this.request<void, void>({
        path: `/reagent_calculations/${id}/`,
        method: "DELETE",
        secure: true,
        ...params,
      }),

    /**
     * @description Завершить/отклонить заявку модератором
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsCompleteUpdate
     * @request PUT:/reagent_calculations/{id}/complete/
     * @secure
     */
    reagentCalculationsCompleteUpdate: (
      id: string,
      data: {
        /** complete или reject */
        action?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<ReagentCalculationDetail, void>({
        path: `/reagent_calculations/${id}/complete/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Сформировать заявку (изменить статус DRAFT → FORMED)
     *
     * @tags reagent_calculations
     * @name ReagentCalculationsFormUpdate
     * @request PUT:/reagent_calculations/{id}/form/
     * @secure
     */
    reagentCalculationsFormUpdate: (id: string, params: RequestParams = {}) =>
      this.request<ReagentCalculationDetail, void>({
        path: `/reagent_calculations/${id}/form/`,
        method: "PUT",
        secure: true,
        format: "json",
        ...params,
      }),
  };
  user = {
    /**
     * @description Аутентификация пользователя с созданием Lua-сессии
     *
     * @tags user
     * @name UserLoginCreate
     * @request POST:/user/login/
     * @secure
     */
    userLoginCreate: (data: UserLogin, params: RequestParams = {}) =>
      this.request<
        {
          message?: string;
          user_id?: number;
          username: string;
          session_key?: string;
          is_staff?: boolean;
          is_superuser?: boolean;
        },
        void
      >({
        path: `/user/login/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Выход пользователя с удалением Lua-сессии
     *
     * @tags user
     * @name UserLogoutCreate
     * @request POST:/user/logout/
     * @secure
     */
    userLogoutCreate: (
      data: {
        session_key?: string;
      },
      params: RequestParams = {},
    ) =>
      this.request<
        {
          message?: string;
          deleted_sessions?: number;
        },
        any
      >({
        path: `/user/logout/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Получить профиль пользователя
     *
     * @tags user
     * @name UserProfileList
     * @request GET:/user/profile/
     * @secure
     */
    userProfileList: (params: RequestParams = {}) =>
      this.request<UserProfile, any>({
        path: `/user/profile/`,
        method: "GET",
        secure: true,
        format: "json",
        ...params,
      }),

    /**
     * @description Обновить профиль пользователя
     *
     * @tags user
     * @name UserProfileUpdate
     * @request PUT:/user/profile/
     * @secure
     */
    userProfileUpdate: (data: UserProfile, params: RequestParams = {}) =>
      this.request<UserProfile, void>({
        path: `/user/profile/`,
        method: "PUT",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),

    /**
     * @description Регистрация нового пользователя
     *
     * @tags user
     * @name UserRegisterCreate
     * @request POST:/user/register/
     * @secure
     */
    userRegisterCreate: (data: UserRegistration, params: RequestParams = {}) =>
      this.request<
        {
          message?: string;
          user_id?: number;
        },
        void
      >({
        path: `/user/register/`,
        method: "POST",
        body: data,
        secure: true,
        type: ContentType.Json,
        format: "json",
        ...params,
      }),
  };
}
