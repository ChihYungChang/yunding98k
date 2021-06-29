"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const base_1 = require("../../core/base/base");
const index_1 = require("../../core/decorator/index");
let UBody = class UBody extends base_1.BaseComponent {
    constructor() {
        super(...arguments);
        this.properties = {
            tTop: {
                type: Number,
                value: 0
            },
            bg: {
                type: String,
                value: '#fff'
            },
            auto: {
                type: String,
                value: 'false'
            },
            btn: {
                type: Number,
                value: 0
            },
            load: {
                type: Boolean,
                value: false,
                observer: this.loadOver
            },
            end: {
                type: Boolean,
                value: false,
                observer: this.isEnd
            },
            more: {
                type: Boolean,
                value: false,
                observer: this.isMore
            },
            reHeight: {
                type: Number,
                value: 0
            },
            scroll: {
                type: Boolean,
                value: false
            },
            home: {
                type: Boolean,
                value: false
            },
            theme: {
                type: Boolean,
                value: false,
                observer: this.isTheme
            }
        };
        this.data = {
            title: 'body',
            isIos: false,
            end: this.properties.end,
            more: this.properties.more,
            theme: this.properties.theme,
            threshold: 0,
            screenHeight: 0,
            netShow: false,
            isIpx: false,
            headHeight: 0,
            netStatus: true,
            toTop: 0,
            isLoad: 3,
            y: 0,
            load: this.properties.load
        };
    }
    isEnd(val) {
        this.setData({
            end: val
        });
    }
    isMore(val) {
        this.setData({
            more: val
        });
    }
    isTheme(val) {
        this.setData({
            theme: val
        });
    }
    onEnd() {
        this.triggerEvent('loadmore', {});
    }
    init(then) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const net = yield this.$util.common.networkStatus();
            const netStatus = net.networkType == 'none' ? false : true;
            this.setData({
                ios: this.app.globalData.phoneInfo.isIos,
                netStatus: netStatus,
                netShow: netStatus ? false : true
            }, () => {
                then(netStatus);
            });
        });
    }
    refresh() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.setData({
                netShow: false
            }, () => {
                const set = setTimeout(() => {
                    this.init(() => {
                        this.data.load == false ? this.triggerEvent('refresh') : '';
                        clearInterval(set);
                    });
                }, 500);
            });
        });
    }
    loadOver(val) {
        wx.nextTick(() => {
            this.setData({
                load: val
            }, () => {
                this.setData({
                    y: val ? -45 : 0,
                    isLoad: val ? 1 : 3
                });
            });
        });
    }
    ready() {
        this.setData({
            screenHeight: this.app.globalData.phoneInfo.screenHeight,
            isIpx: this.app.globalData.phoneInfo.isIpx,
            headHeight: this.app.globalData.phoneInfo.headHeight
        });
    }
    touchMove(e) {
        if (this.data.isLoad >= 3)
            return;
        if (e.detail.y > this.data.threshold) {
            this.setData({
                isLoad: 2
            });
        }
        else {
            this.setData({
                isLoad: 1
            });
        }
    }
    touchEnd() {
        if (this.data.isLoad >= 3)
            return;
        if (this.data.isLoad == 2) {
            this.setData({
                isLoad: 3,
                y: 0
            });
            wx.vibrateShort();
            this.triggerEvent('onRefresh');
        }
        else if (this.data.isLoad == 1) {
            this.setData({
                y: -45
            });
        }
    }
    onScroll(e) {
        this.triggerEvent('scroll', e.detail);
    }
    goTop(tTop) {
        wx.nextTick(() => {
            this.setData({
                toTop: tTop
            });
        });
    }
    onRefresh() {
        this.triggerEvent('onRefresh');
    }
};
UBody = tslib_1.__decorate([
    index_1.WxComponent()
], UBody);
exports.default = UBody;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwrQ0FBcUQ7QUFDckQsc0RBQXlEO0FBRXpELElBQXFCLEtBQUssR0FBMUIsTUFBcUIsS0FBTSxTQUFRLG9CQUFhO0lBQWhEOztRQUNFLGVBQVUsR0FBK0M7WUFDdkQsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxFQUFFLEVBQUU7Z0JBQ0YsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLE1BQU07YUFDZDtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsTUFBTTtnQkFDWixLQUFLLEVBQUUsT0FBTzthQUNmO1lBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxNQUFNO2dCQUNaLEtBQUssRUFBRSxDQUFDO2FBQ1Q7WUFDRCxJQUFJLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLE9BQU87Z0JBQ2IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO2FBQ3hCO1lBQ0QsR0FBRyxFQUFFO2dCQUNILElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxJQUFJLENBQUMsS0FBSzthQUNyQjtZQUNELElBQUksRUFBRTtnQkFDSixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSSxDQUFDLE1BQU07YUFDdEI7WUFDRCxRQUFRLEVBQUU7Z0JBQ1IsSUFBSSxFQUFFLE1BQU07Z0JBQ1osS0FBSyxFQUFFLENBQUM7YUFDVDtZQUNELE1BQU0sRUFBRTtnQkFDTixJQUFJLEVBQUUsT0FBTztnQkFDYixLQUFLLEVBQUUsS0FBSzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLElBQUksRUFBRSxPQUFPO2dCQUNiLEtBQUssRUFBRSxLQUFL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O1lBQ3pCLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsTUFBTSxFQUFFLENBQUM7Z0JBQ1QsQ0FBQyxFQUFFLENBQUM7YUFDTCxDQUFDLENBQUM7WUFDSCxFQUFFLENBQUMsWUFBWSxFQUFFLENBQUM7WUFDbEIsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztTQUNoQzthQUFNLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLElBQUksQ0FBQyxFQUFFO1lBQ2hDLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsQ0FBQyxFQUFFLENBQUMsRUFBRTthQUNQLENBQUMsQ0FBQztTQUNKO0lBQ0gsQ0FBQztJQUNELFFBQVEsQ0FBQyxDQUFNO1FBQ2IsSUFBSSxDQUFDLFlBQVksQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFDRCxLQUFLLENBQUMsSUFBWTtRQUNoQixFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRTtZQUNmLElBQUksQ0FBQyxPQUFPLENBQUM7Z0JBQ1gsS0FBSyxFQUFFLElBQUk7YUFDWixDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxTQUFTO1FBQ1AsSUFBSSxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsQ0FBQztJQUNqQyxDQUFDO0NBQ0YsQ0FBQTtBQWxMb0IsS0FBSztJQUR6QixtQkFBVyxFQUFFO0dBQ08sS0FBSyxDQWtMekI7a0JBbExvQixLQUFLIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQmFzZUNvbXBvbmVudCB9IGZyb20gJy4uLy4uL2NvcmUvYmFzZS9iYXNlJztcbmltcG9ydCB7IFd4Q29tcG9uZW50IH0gZnJvbSAnLi4vLi4vY29yZS9kZWNvcmF0b3IvaW5kZXgnO1xuQFd4Q29tcG9uZW50KClcbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFVCb2R5IGV4dGVuZHMgQmFzZUNvbXBvbmVudCB7XG4gIHByb3BlcnRpZXM6IFdlY2hhdE1pbmlwcm9ncmFtLkNvbXBvbmVudC5Qcm9wZXJ0eU9wdGlvbiA9IHtcbiAgICB0VG9wOiB7XG4gICAgICB0eXBlOiBOdW1iZXIsXG4gICAgICB2YWx1ZTogMFxuICAgIH0sXG4gICAgYmc6IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnI2ZmZidcbiAgICB9LFxuICAgIGF1dG86IHtcbiAgICAgIHR5cGU6IFN0cmluZyxcbiAgICAgIHZhbHVlOiAnZmFsc2UnXG4gICAgfSxcbiAgICBidG46IHtcbiAgICAgIHR5cGU6IE51bWJlcixcbiAgICAgIHZhbHVlOiAwXG4gICAgfSxcbiAgICBsb2FkOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgb2JzZXJ2ZXI6IHRoaXMubG9hZE92ZXJcbiAgICB9LFxuICAgIGVuZDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZSxcbiAgICAgIG9ic2VydmVyOiB0aGlzLmlzRW5kXG4gICAgfSxcbiAgICBtb3JlOiB7XG4gICAgICB0eXBlOiBCb29sZWFuLFxuICAgICAgdmFsdWU6IGZhbHNlLFxuICAgICAgb2JzZXJ2ZXI6IHRoaXMuaXNNb3JlXG4gICAgfSxcbiAgICByZUhlaWdodDoge1xuICAgICAgdHlwZTogTnVtYmVyLFxuICAgICAgdmFsdWU6IDBcbiAgICB9LFxuICAgIHNjcm9sbDoge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gICAgaG9tZToge1xuICAgICAgdHlwZTogQm9vbGVhbixcbiAgICAgIHZhbHVlOiBmYWxzZVxuICAgIH0sXG4gICAgdGhlbWU6IHtcbiAgICAgIHR5cGU6IEJvb2xlYW4sXG4gICAgICB2YWx1ZTogZmFsc2UsXG4gICAgICBvYnNlcnZlcjogdGhpcy5pc1RoZW1lXG4gICAgfVxuICB9O1xuICBpc0VuZCh2YWw6IGJvb2xlYW4pIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgZW5kOiB2YWxcbiAgICB9KTtcbiAgfVxuICBpc01vcmUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIG1vcmU6IHZhbFxuICAgIH0pO1xuICB9XG4gIGlzVGhlbWUodmFsOiBib29sZWFuKSB7XG4gICAgdGhpcy5zZXREYXRhKHtcbiAgICAgIHRoZW1lOiB2YWxcbiAgICB9KTtcbiAgfVxuICBvbkVuZCgpIHtcbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnbG9hZG1vcmUnLCB7fSk7XG4gIH1cbiAgYXN5bmMgaW5pdCh0aGVuOiBGdW5jdGlvbikge1xuICAgIGNvbnN0IG5ldDogYW55ID0gYXdhaXQgdGhpcy4kdXRpbC5jb21tb24ubmV0d29ya1N0YXR1cygpO1xuICAgIGNvbnN0IG5ldFN0YXR1cyA9IG5ldC5uZXR3b3JrVHlwZSA9PSAnbm9uZScgPyBmYWxzZSA6IHRydWU7XG4gICAgdGhpcy5zZXREYXRhKFxuICAgICAge1xuICAgICAgICBpb3M6IHRoaXMuYXBwLmdsb2JhbERhdGEucGhvbmVJbmZvLmlzSW9zLFxuICAgICAgICBuZXRTdGF0dXM6IG5ldFN0YXR1cyxcbiAgICAgICAgbmV0U2hvdzogbmV0U3RhdHVzID8gZmFsc2UgOiB0cnVlXG4gICAgICB9LFxuICAgICAgKCkgPT4ge1xuICAgICAgICB0aGVuKG5ldFN0YXR1cyk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuICBhc3luYyByZWZyZXNoKCkge1xuICAgIHRoaXMuc2V0RGF0YShcbiAgICAgIHtcbiAgICAgICAgbmV0U2hvdzogZmFsc2VcbiAgICAgIH0sXG4gICAgICAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNldCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICAgIHRoaXMuaW5pdCgoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmRhdGEubG9hZCA9PSBmYWxzZSA/IHRoaXMudHJpZ2dlckV2ZW50KCdyZWZyZXNoJykgOiAnJztcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoc2V0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgNTAwKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG4gIGxvYWRPdmVyKHZhbDogYm9vbGVhbikge1xuICAgIHd4Lm5leHRUaWNrKCgpID0+IHtcbiAgICAgIHRoaXMuc2V0RGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGxvYWQ6IHZhbFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgICAgIHk6IHZhbCA/IC00NSA6IDAsXG4gICAgICAgICAgICBpc0xvYWQ6IHZhbCA/IDEgOiAzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH1cbiAgZGF0YTogYW55ID0ge1xuICAgIHRpdGxlOiAnYm9keScsXG4gICAgaXNJb3M6IGZhbHNlLFxuICAgIGVuZDogdGhpcy5wcm9wZXJ0aWVzLmVuZCxcbiAgICBtb3JlOiB0aGlzLnByb3BlcnRpZXMubW9yZSxcbiAgICB0aGVtZTogdGhpcy5wcm9wZXJ0aWVzLnRoZW1lLFxuICAgIHRocmVzaG9sZDogMCxcbiAgICBzY3JlZW5IZWlnaHQ6IDAsXG4gICAgbmV0U2hvdzogZmFsc2UsXG4gICAgaXNJcHg6IGZhbHNlLFxuICAgIGhlYWRIZWlnaHQ6IDAsXG4gICAgbmV0U3RhdHVzOiB0cnVlLFxuICAgIHRvVG9wOiAwLFxuICAgIC8vIDHkuIvmi4nliLfmlrAgMuadvuW8gOWIt+aWsCAz5Yqg6L295LitIDTliqDovb3lrozmiJBcbiAgICBpc0xvYWQ6IDMsXG4gICAgeTogMCxcbiAgICBsb2FkOiB0aGlzLnByb3BlcnRpZXMubG9hZFxuICB9O1xuICByZWFkeSgpIHtcbiAgICB0aGlzLnNldERhdGEoe1xuICAgICAgc2NyZWVuSGVpZ2h0OiB0aGlzLmFwcC5nbG9iYWxEYXRhLnBob25lSW5mby5zY3JlZW5IZWlnaHQsXG4gICAgICBpc0lweDogdGhpcy5hcHAuZ2xvYmFsRGF0YS5waG9uZUluZm8uaXNJcHgsXG4gICAgICBoZWFkSGVpZ2h0OiB0aGlzLmFwcC5nbG9iYWxEYXRhLnBob25lSW5mby5oZWFkSGVpZ2h0XG4gICAgfSk7XG4gIH1cbiAgdG91Y2hNb3ZlKGU6IGFueSkge1xuICAgIGlmICh0aGlzLmRhdGEuaXNMb2FkID49IDMpIHJldHVybjtcbiAgICBpZiAoZS5kZXRhaWwueSA+IHRoaXMuZGF0YS50aHJlc2hvbGQpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGlzTG9hZDogMlxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIGlzTG9hZDogMVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIHRvdWNoRW5kKCkge1xuICAgIGlmICh0aGlzLmRhdGEuaXNMb2FkID49IDMpIHJldHVybjtcbiAgICBpZiAodGhpcy5kYXRhLmlzTG9hZCA9PSAyKSB7XG4gICAgICB0aGlzLnNldERhdGEoe1xuICAgICAgICBpc0xvYWQ6IDMsXG4gICAgICAgIHk6IDBcbiAgICAgIH0pO1xuICAgICAgd3gudmlicmF0ZVNob3J0KCk7XG4gICAgICB0aGlzLnRyaWdnZXJFdmVudCgnb25SZWZyZXNoJyk7XG4gICAgfSBlbHNlIGlmICh0aGlzLmRhdGEuaXNMb2FkID09IDEpIHtcbiAgICAgIHRoaXMuc2V0RGF0YSh7XG4gICAgICAgIHk6IC00NVxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIG9uU2Nyb2xsKGU6IGFueSkge1xuICAgIHRoaXMudHJpZ2dlckV2ZW50KCdzY3JvbGwnLCBlLmRldGFpbCk7XG4gIH1cbiAgZ29Ub3AodFRvcDogbnVtYmVyKSB7XG4gICAgd3gubmV4dFRpY2soKCkgPT4ge1xuICAgICAgdGhpcy5zZXREYXRhKHtcbiAgICAgICAgdG9Ub3A6IHRUb3BcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG4gIG9uUmVmcmVzaCgpIHtcbiAgICB0aGlzLnRyaWdnZXJFdmVudCgnb25SZWZyZXNoJyk7XG4gIH1cbn1cbiJdfQ==