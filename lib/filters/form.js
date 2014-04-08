/*
 * Model -> form converstion
 */

_actions = {
    create: 'new' // Create uses same form as new
    , update: 'edit' // Update uses same form as edit
};

function bs_iterator (name, field) {
    if (field.widget && field.widget.type === 'hidden') return field.widget.toHTML(name, field);
    var label = this.label || name[0].toUpperCase() + name.substr(1).replace('_', ' ');
    field.widget.classes += ' form-control';
    return '<div class="control-group'
        + (field.error ? ' error' : '')
        + '">'
        + '<label class="control-label" for="'+(field.id || 'id_'+name)+'">'+label+'</label>'
        + '<div class="controls">'
        + field.widget.toHTML(name, field)
        + (field.error ? '<p class="help-block">' + field.error + '</p>' : '')
        + '</div>'
        + '</div>';
}

module.exports.convertModelForm = function (next) {
    var self = this;
    // Setup form_render helper for view
    this.form_render = function () {
        console.log(this.form);
        if (this.form)
            return this.form.toHTML(bs_iterator);
        return 'bluh';
    };

    // If controller has _model parameter create form from model based on current action
    if (this._model) {
        this.form = this.forms_create(this._model, _actions[this.__action] || this.__action);
    }
    next();
};