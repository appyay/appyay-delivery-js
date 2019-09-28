const tape = require('tape');
const _test = require('tape-promise').default;
const test = _test(tape); 
const appyay = require ('../../dist/appyay-delivery.node.js')

const contentTypeId = '5d2718bc3f2b6f0718952e4e'; //features Content Type
const itemId = '5d2718bd3f2b6f0718952e4f'; //feature
const params = {
  environmentId: '5d441076755ca20888310504',
  apikey: 'PIXUGZJQO52SY6BRLI3VC23ZJVJSGPSIFQSGIXREFZIUQKDCNVIA',
}
let client = appyay.createClient(params);

test('should get space', async function (t) {
  client.getSpace()
  .then(function(response){
  t.true(response.space)
   });
});

test('should get content types', async function (t) {
client.getContentTypes()
.then(function(response){
t.true(response.contentTypes)
 });
});

test('should get content type', async function (t) {
  client.getContentType(contentTypeId)
  .then(function(response){
  t.true(response.contentType)
   });
});

test('should get all items of environment', async function (t) {
  client.getEnvironmentItems()
  .then(function(response){
  t.true(response)
   });
});

test('should get items of content type', async function (t) {
  client.getItems(contentTypeId)
  .then(function(response){
  t.true(response.items)
   });
});

test('should get item', async function (t) {
  client.getItem(itemId)
  .then(function(response){
  t.true(response.item)
   });
});