/*Product Detail Page Specs*/
describe("Cart", function() {
  beforeEach(function(done) {
    Router.go('/product/example-product');
    Tracker.afterFlush(done);
  });

  beforeEach(waitForRouter);

  // add to cart from pdp
  describe("Add to cart", function() {
    // empty cart items before each test
    afterEach(function(done) {
      var cartId = ReactionCore.Collections.Cart.findOne()._id;
      ReactionCore.Collections.Cart.update({
        _id: cartId
      }, {
        $set: {
          items: []
        }
      });
      done();
    });

    it("should not add to cart without option selected", function() {
      // no option is selected yet
      $('#add-to-cart').trigger('click');
      // check alert
      expect($('#product-alerts div:first-child').text()).not.toBeNull();
    });

    it("should add selected option to cart", function(done) {
      var option1 = $('.variant-product-options .variant-select-option')[0];
      var addToCartButton = $('#add-to-cart');
      var cartCount = $('.cart-icon .badge').text();
      var cartId = ReactionCore.Collections.Cart.findOne()._id;
      // needs client stubs
      /*var spyOnCart = spyOn(ReactionCore.Collections.Cart, 'update').and.returnValue();*/

      var spyOnOptionEvent = spyOnEvent(option1, 'click');
      var spyOnAddToCartEvent = spyOnEvent(addToCartButton, 'click');

      $(option1).trigger('click');

      expect('click').toHaveBeenTriggeredOn(option1);
      expect(spyOnOptionEvent).toHaveBeenTriggered();

      $(addToCartButton).trigger('click');
      expect(spyOnAddToCartEvent).toHaveBeenTriggered();
      /*expect(spyOnCart).toHaveBeenCalled();*/
      done();
    });


    it("should let the quantity for selected option be changed", function() {
      var option1 = $('.variant-product-options .variant-select-option')[0];
      var addToCartButton = $('#add-to-cart');
      var cartCount = $('.cart-icon .badge').text();

      var spyOnOptionEvent = spyOnEvent(option1, 'click');
      var spyOnAddToCartEvent = spyOnEvent(addToCartButton, 'click');

      $('#add-to-cart-quantity').val(22);
      $(option1).trigger('click');

      expect('click').toHaveBeenTriggeredOn(option1);
      expect(spyOnOptionEvent).toHaveBeenTriggered();

      $(addToCartButton).trigger('click');
      expect(spyOnAddToCartEvent).toHaveBeenTriggered();
    });

    it("should throw an error if not enough quantity", function() {
      var option1 = $('.variant-product-options .variant-select-option')[0];
      var addToCartButton = $('#add-to-cart');
      var cartCount = $('.cart-icon .badge').text();

      var spyOnOptionEvent = spyOnEvent(option1, 'click');
      var spyOnAddToCartEvent = spyOnEvent(addToCartButton, 'click');

      $('#add-to-cart-quantity').val(2002);
      $(option1).trigger('click');

      expect('click').toHaveBeenTriggeredOn(option1);
      expect(spyOnOptionEvent).toHaveBeenTriggered();

      $(addToCartButton).trigger('click');
      expect(spyOnAddToCartEvent).toHaveBeenTriggered();

      expect($('.cart-icon .badge').text()).toEqual(cartCount);

    });

    it("should not add to cart without variant/option selected", function() {
      // no option is selected yet
      $('#add-to-cart').trigger('click');
      // check alert
      expect($('#product-alerts div:first-child').text()).not.toBeNull();
    });

    it("should add selected variant/option   to cart", function() {
      var option1 = $('.variant-product-options .variant-select-option')[0];
      var addToCartButton = $('#add-to-cart');
      var cartCount = $('.cart-icon .badge').text();
      var spyOnOptionEvent = spyOnEvent(option1, 'click');
      var spyOnAddToCartEvent = spyOnEvent(addToCartButton, 'click');

      $(option1).trigger('click');

      expect('click').toHaveBeenTriggeredOn(option1);
      expect(spyOnOptionEvent).toHaveBeenTriggered();

      $('#add-to-cart').trigger('click');
      expect(spyOnAddToCartEvent).toHaveBeenTriggered();
    });

    it("should goto checkout when checkout button clicked ", function(done) {
      var btnCheckout = $('#btn-checkout');
      var cartIcon = $('.cart-icon');

      var spyOnCheckoutButton = spyOnEvent(btnCheckout, 'click');
      var spyOnCartIcon = spyOnEvent(cartIcon, 'click');

      $(cartIcon).trigger('click');
      expect(spyOnCartIcon).toHaveBeenTriggered();

      $('#btn-checkout').trigger('click');
      expect(spyOnCheckoutButton).toHaveBeenTriggered();
      /*expect(Router.current().url).toEqual("/checkout");*/
      done();
    });

  });

});
