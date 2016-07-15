var app = app || {};

app.MetricsView = Backbone.View.extend({

  template: _.template('<strong class="structure">Metrics</strong><fieldset id="metric-selectors" class="form-group"></fieldset>'),

  initialize: function() {
    this.metricSelectors = [
      new app.MetricSelector({ id: "jobstate", label: "Job State" }),
      new app.MetricSectionTitle({ title: "CPU" }),
      new app.MetricSelector({ id: "totalJobTime", label: "Total Job Time" }),
      new app.MetricSelector({ id: "totalJobCPU", label: "Total Job CPU" }),
      new app.MetricSectionTitle({ title: "Storage" }),
      new app.MetricSelector({ id: "readTotal", label: "Read Total" }),
      new app.MetricSelector({ id: "writeTotal", label: "Write Total" }),
    ];
  },

  render: function(){
    this.$el.html(this.template());
    for (var i in this.metricSelectors) {
      var metricSelector = this.metricSelectors[i];
      this.$('#metric-selectors').append(metricSelector.$el);
      metricSelector.render();
    }
  },

  events: {
    'click .metric-selector': 'setActive',
  },

  setActive: function(event) {
    this.$('.active').removeClass('active');
    $(event.target).addClass('active');
    app.scope.set({ metric: event.target.id });
  },

});

app.MetricSectionTitle = Backbone.View.extend({

  tagName: 'span',
  className: 'metric-section-title',

  template: _.template('<%=title%>'),

  initialize: function(params) {
    this.title = params.title;
  },

  render: function(){
    this.$el.html(this.template({ title: this.title }));
  },

});
