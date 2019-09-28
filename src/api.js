const axios = require('axios')

const baseURL = 'https://api.appyay.com/cd/v1'
var axiosOptions = {
  baseURL: baseURL,
  params: {}
}

export default function api (config) {
  console.log('config', config)
  if (!config.apikey) {
    throw new Error('API key is missing')
  }

  axiosOptions.params.apikey = config.apikey

  var http = axios.create(axiosOptions)

  /**
   * Get Space
   * @memberof AppyayClientAPI
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getSpace()
   * .then((response) => console.log(response.space))
   * .catch(console.error)
   */
  function getSpace () {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }

    return http
      .get(`/environments/${config.environmentId}/space`)
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get Content Types
   * @memberof AppyayClientAPI
   * @param  {Object=} query - Object with search parameters
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getContentTypes()
   * .then((response) => console.log(response.contentTypes))
   * .catch(console.error)
   */
  function getContentTypes (query = {}) {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }
    return http
      .get(`/environments/${config.environmentId}/content-types`, {
        params: query
      })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get Content Type
   * @memberof AppyayClientAPI
   * @param  {string} contentTypeId
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getContentType()
   * .then((response) => console.log(response.contentType))
   * .catch(console.error)
   */
  function getContentType (contentTypeId) {
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return http
      .get(`/content-types/${contentTypeId}`)
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get Environment Items
   * @memberof AppyayClientAPI
   * @param  {string} environmentId
   * @param  {Object=} query - Object with search parameters.
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getEnvironmentItems('<environment_id')
   * .then((response) => console.log(response))
   * .catch(console.error)
   */
  function getEnvironmentItems (query = {}) {
    if (!config.environmentId) {
      throw new Error('Environment ID is missing')
    }
    return http
      .get(`/environments/${config.environmentId}/items`, { params: query })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get Items of Content Type
   * @memberof AppyayClientAPI
   * @param  {string} contentTypeId
   * @param  {Object=} query - Object with search parameters.
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getItems('<content_type_id')
   * .then((response) => console.log(response.items))
   * .catch(console.error)
   */
  function getItems (contentTypeId, query = {}) {
    if (!contentTypeId) {
      throw new Error('Content Type ID is missing')
    }
    return http
      .get(`/content-types/${contentTypeId}/items`, { params: query })
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  /**
   * Get Item
   * @memberof AppyayClientAPI
   * @param  {string} itemId
   * @return {Promise<DataObject>} Promise containing data object
   * @example
   * const appyay = require('appyay')
   * const client = appyay.createClient({
   *  apikey: '<api_key>',
   *  environmentId: '<environment_id>'
   * })
   *
   * client.getItem('<item_id')
   * .then((response) => console.log(response))
   * .catch(console.error)
   */
  function getItem (itemId) {
    if (!itemId) {
      throw new Error('Item ID is missing')
    }
    return http
      .get(`/items/${itemId}`)
      .then(response => {
        return response.data
      })
      .catch(function (error) {
        return error
      })
  }

  return {
    getSpace: getSpace,
    getContentTypes: getContentTypes,
    getContentType: getContentType,
    getEnvironmentItems: getEnvironmentItems,
    getItems: getItems,
    getItem: getItem
  }
}
