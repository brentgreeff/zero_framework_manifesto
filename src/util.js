
Context = function () {
  var current_script = document.currentScript || document._currentScript
  if (current_script == null) { throw 'currentScript is null' }
  this.ownerDoc = current_script.ownerDocument;
};

Context.prototype.loadTemplate = function (ref) {
  this.template = this.ownerDoc.querySelector( ref );
};

Context.prototype.template = function (selector) {
  if ( selector == null ) { selector = 'template' }
  this.loadTemplate( selector );
  return this;
};

Context.prototype.fragment = function () {
  return document.importNode( this.template.content, true );
}

//

NewElement = function(name, attr) {
  var newElemProto = Object.create( HTMLElement.prototype );
  template_context = new Context();

  newElemProto.createdCallback = function () {
    this.appendChild( template_context.template().fragment() );
  }

  Object.keys(attr).forEach(function (key) {
    newElemProto[key] = attr[key];
  });
  document.registerElement(name, { prototype: newElemProto });
}
