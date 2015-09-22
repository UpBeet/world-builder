var m = require('mithril');
//A component
var weslo = {};
// A class definition (Model)
weslo.World = function(data) {
    this.description = m.prop(data.description);
    this.thriving = m.prop(false);
};
//Another class definition(this is just an array)
weslo.WorldList = Array;

var myWorld = new weslo.World({description: "Gazorpazorp"});
// View model
weslo.vm = {
    init: function() {
        weslo.vm.list = new weslo.WorldList();

        weslo.vm.description = m.prop("");

        weslo.vm.add = function() {
            if(weslo.vm.description()) {
                weslo.vm.list.push(new weslo.World({description: weslo.vm.description()}));
                weslo.vm.description("");
            }
        }
    }
};

weslo.controller = function() {
    weslo.vm.init();
};

weslo.view = function() {
    return m("html", [
        m("body", [
            m("input", {onchange: m.withAttr("value", weslo.vm.description), value: weslo.vm.description()}),
            m("button", {onclick: weslo.vm.add}, "Add"),
            m("table", [
                weslo.vm.list.map(function(world, index) {
                    return m("tr", [
                        m("td", [
                            m("input[type=checkbox]", {onclick: m.withAttr("checked", world.thriving), checked: world.thriving()})
                        ]),
                        m("td", {style: {textDecoration: world.thriving() ? "line-through" : "none"}}, world.description()),
                    ])
                })
            ])
        ])
    ]);
};

m.mount(document, {controller: weslo.controller, view: weslo.view});
