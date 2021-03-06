'use strict';
(function () {
  angular
      .module('fsApp.rooms', [])
      .controller('RoomsController', ['dataFactory', RoomsController]);

  function RoomsController(dataFactory) {
    var rooms = this;
    rooms.getRooms = getRooms;
    rooms.list = [];

    var date = new Date();
    var timeRange = [];
    var weekday = [];
    init();

    ///////////////////////////////////////////////////

    function init() {
      // Get current day
      rooms.day = date.getDay().toString();
      createTimeRange();
      rooms.time = getCurrentTimeRange();
      translateWeekDay();
      getRooms();
    }

    function createTimeRange() {
      timeRange.push(createDate(0, 0));
      timeRange.push(createDate(10, 0));
      timeRange.push(createDate(11, 45));
      timeRange.push(createDate(13, 30));
      timeRange.push(createDate(15, 15));
      timeRange.push(createDate(17, 0));
      timeRange.push(createDate(18, 45));
    }

    function createDate(hours, minutes) {
      var time = new Date();
      time.setHours(hours);
      time.setMinutes(minutes);
      return time;
    }

    function getCurrentTimeRange() {
      for (var i = 0; i < timeRange.length - 1; i++) {
        if (timeRange[i].getTime() < date.getTime() && timeRange[i + 1].getTime() > date.getTime()) {
          return i.toString();
        }
      }
      return "6";
    }

    function getRooms() {
      dataFactory.getRooms({
            day: weekday[parseInt(rooms.day)], hour: timeRange[parseInt(rooms.time)].getHours(),
            minute: timeRange[parseInt(rooms.time)].getMinutes(), type: rooms.type
          })
          .then(function (result) {
            rooms.list = result.data;
            for (var i = 0; i < rooms.list.length; i++) {
              var time = new Date();
              time.setHours(rooms.list[i].hour);
              time.setMinutes(rooms.list[i].minute);
              rooms.list[i].time = time;
            }
            ;
          });
    }

    function translateWeekDay() {
      weekday = new Array(7);
      weekday[0] = "SUNDAY";
      weekday[1] = "MONDAY";
      weekday[2] = "TUESDAY";
      weekday[3] = "WEDNESDAY";
      weekday[4] = "THURSDAY";
      weekday[5] = "FRIDAY";
      weekday[6] = "SATURDAY";
    }

  }
})();