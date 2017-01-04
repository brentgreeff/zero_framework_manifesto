
Context = function () {
  var current_script = document.currentScript || document._currentScript
  if (current_script == null) { throw 'currentScript is null' }
  this.ownerDoc = current_script.ownerDocument;
};

Context.prototype.loadTemplate = function (selector) {
  if ( selector == null ) { selector = 'template' }

  template = this.ownerDoc.querySelector( selector );

  template.fragment = function () {
    return document.importNode( template.content, true );
  }
  return template;
};

NewElement = function(name, attr) {
  var newElemProto = Object.create( HTMLElement.prototype );
  template_context = new Context();

  newElemProto.createdCallback = function () {
    template = template_context.loadTemplate();
    this.appendChild( template.fragment() );
  }

  Object.keys(attr).forEach(function (key) {
    newElemProto[key] = attr[key];
  });
  document.registerElement(name, { prototype: newElemProto });
}
