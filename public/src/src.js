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

        weslo.vm.description = m.prop('');

        weslo.vm.add = function(description) {
            if(description()) {
                weslo.vm.list.push(new weslo.World({description: description()}));
                weslo.vm.description('');
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
            m("input"),
            m("button", "Add"),
            m("table", [
                m("tr", [
                    m("td", [
                        m("input[type=checkbox]")
                    ]),
                    m("td", "task description"),
                ])
            ])
        ])
    ]);
};

m.render(document, weslo.view());
