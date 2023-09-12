const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('@shopify/shopify-api/adapters/node');
const { shopifyApi, LATEST_API_VERSION } = require('@shopify/shopify-api');

const apiKey = '132be5ee0c9b6005308996e22b02422f';
const adminApiAccessToken = "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";
const apiSecretKey = '44ddb448b567ed490c393fc6994c8768';
const shopName = "designer-studio-app";
const shopify = shopifyApi({
    // The next 4 values are typically read from environment variables for added security
    adminApiAccessToken,
    apiKey,
    apiSecretKey,
    hostName: "http://localhost:3001",
    apiVersion: LATEST_API_VERSION,
    isEmbeddedApp: false,
    scopes: ['read_products', 'write_products']

});



const app = express();
// app.get(shopify.config.auth.path, shopify.auth.begin());
// app.get(
//     shopify.config.auth.callbackPath,
//     shopify.auth.callback(),
//     shopify.redirectToShopifyOrAppRoot()
//   );
//   app.post(
//     shopify.config.webhooks.path,
//     shopify.processWebhooks({ webhookHandlers: GDPRWebhookHandlers })
//   );
app.use(express.json());


app.use(cors()); // use cors middleware

app.use(bodyParser.json());

app.post('/add-product', async (req, res) => {
    let url = `https://${shopName}.myshopify.com/admin/api/2023-07/products.json`;
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Shopify-Access-Token': adminApiAccessToken
            },
            body: JSON.stringify({product:{
                "available": true,
                "collections": [],
                "compare_at_price": "25.00",
                "compare_at_price_max": "25.00",
                "compare_at_price_min": "25.00",
                "compare_at_price_varies": false,
                "content": "<h3>Are you low on health? Well we've got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>",
                "body_html": "<h3>Are you low on health? Well we've got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>",
                "created_at": "2022-04-13 14:46:16 -0400",
                "description": "<h3>Are you low on health? Well we've got the potion just for you!</h3>\n<p>Just need a top up? Almost dead? In between? No need to worry because we have a range of sizes and strengths!</p>",
                "featured_image": {},
                "featured_media": {},
                "first_available_variant": {},
                "gift_card?": false,
                "handle": "health-potion",
                "has_only_default_variant": false,
                "images": [],
                "media": [],
                "id":45646416841684864,
                "price": "10.00",
                "price_max": "22.00",
                "price_min": "10.00",
                "price_varies": true,
                "requires_selling_plan": false,
                "selected_or_first_available_selling_plan_allocation": {},
                "selected_or_first_available_variant": {},
                "selected_selling_plan": null,
                "selected_selling_plan_allocation": null,
                "selected_variant": null,
                "selling_plan_groups": [],
                "status": "active",
                "tags": [
                    "healing"
                ],
                "update": true,
                "template_suffix": "",
                "title": "Health potion sdvsdvsvsv",
                "type": "Health",
                "name": "acacacac",
                "variants": [],
                "vendor": "Polina's Potent Potions",
                "product_type": "Snowboaddadrd"
            }}),
        });
        // const product = new shopify.rest.Product({ session: res.locals.shopify });
        // product.title = "Burton Custom Freestyle 151";
        // product.body_html = "<strong>Good snowdsdfvdsvsdvsdvboard!</strong>";
        // product.vendor = "Burton";
        // product.product_type = "Snowboaddadrd";
        // product.status = "draft";
        // await product.save({
        //     update: true,
        // });
        // const product = await shopify.product.create(req.body);
        res.status(201).send(await response.json());
    } catch (error) {
        console.log(error);
        res.status(500).send(error.message);
    }
});

const port = 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
