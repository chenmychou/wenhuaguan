<template>
    <div :class="{'num-round': buttonStyle === 'round'}" class="num-control">
        <div>
            <a @click="sub" class="num-oper num-oper-sub" :class="{'num-disabled':disabledMin}">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="18" height="18">
                    <defs></defs>
                    <path d="M863.74455 544.00086 163.424056 544.00086c-17.664722 0-32.00086-14.336138-32.00086-32.00086s14.336138-32.00086 32.00086-32.00086l700.320495 0c17.695686 0 31.99914 14.336138 31.99914 32.00086S881.440237 544.00086 863.74455 544.00086z"></path>
                </svg>
            </a>
            <input v-model.number="currentValue" :name="name" class="num-input" :style="{width: width}" :readonly="!fillable" pattern="[0-9]*" type="number" @blur="blur" />
            <a @click="add" class="num-oper num-oper-plus" :class="{'num-disabled':disabledMax}">
                <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="20" height="20">
                    <defs></defs>
                    <path d="M863.328262 481.340895l-317.344013 0.099772L545.984249 162.816826c0-17.664722-14.336138-32.00086-32.00086-32.00086s-31.99914 14.336138-31.99914 32.00086l0 318.400215-322.368714-0.17718c-0.032684 0-0.063647 0-0.096331 0-17.632039 0-31.935493 14.239806-32.00086 31.904529-0.096331 17.664722 14.208843 32.031824 31.871845 32.095471l322.59234 0.17718 0 319.167424c0 17.695686 14.336138 32.00086 31.99914 32.00086s32.00086-14.303454 32.00086-32.00086L545.982529 545.440667l317.087703-0.099772c0.063647 0 0.096331 0 0.127295 0 17.632039 0 31.935493-14.239806 32.00086-31.904529S880.960301 481.404542 863.328262 481.340895z"></path>
                </svg>
            </a>
        </div>
    </div>
</template>

<script>
const Big = require('big.js')
export default {
    props: {
        min: Number,
        max: Number,
        readonly: Boolean,
        step: {
            type: Number,
            default: 1
        },
        value: {
            validator(value) {
                if (typeof value === 'number') {
                    return true
                } else if (typeof value === 'string') {
                    return value === ''
                }
                return false
            },
            default: 0
        },
        name: String,
        fillable: {
            type: Boolean,
            default: false
        },
        width: {
            type: String,
            default: '80px'
        },
        buttonStyle: {
            type: String,
            default: 'square'
        },
        align: {
            type: String,
            default: 'right'
        }
    },
    created() {
        this.currentValue = this.value
    },
    data() {
        return {
            currentValue: 0
        }
    },
    computed: {
        disabledMin() {
            return typeof this.min === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue <= this.min)
        },
        disabledMax() {
            return typeof this.max === 'undefined' ? false : (this.currentValue === '' ? true : this.currentValue >= this.max)
        }
    },
    watch: {
        currentValue(newValue, old) {
            if (newValue !== '') {
                if (typeof this.min !== 'undefined' && this.currentValue < this.min) {
                    this.currentValue = this.min
                }
                if (this.max && this.currentValue > this.max) {
                    this.currentValue = this.max
                }
            }
            this.$emit('input', this.currentValue)
            this.$emit('on-change', this.currentValue)
        },
        value(newValue) {
            this.currentValue = newValue
        }
    },
    methods: {
        add() {
            if (!this.disabledMax) {
                const x = new Big(this.currentValue)
                this.currentValue = x.plus(this.step) * 1
            }
        },
        sub() {
            if (!this.disabledMin) {
                const x = new Big(this.currentValue)
                this.currentValue = x.minus(this.step) * 1
            }
        },
        blur() {
            if (this.currentValue === '') {
                this.currentValue = 0
            }
        }
    }
}
</script>
<style lang="scss" scoped>
@import "~static/styles/components/num-control";
</style>