import { defineStore } from 'pinia';

interface Infos {
    mb_in: number
    mb_out: number
    timestamp: Date
}
  
const $fetch = async (url: string): Promise<Infos> => {
    const res = await fetch(url)
    return res.json()
}
  
export const useMegabitStore = defineStore('websiteStore', {
    state: () => ({
        mbs_in: [{value: 0, timestamp: new Date() }],
        mbs_out: [{value: 0, timestamp: new Date() }],
        state: 'init',
        nbFetch: 0
    }),
    actions: {
        async fetch() {
            if (this.nbFetch < 100) {

                const infos = await $fetch('http://localhost:3001')
                this.mbs_in.push({ value: infos.mb_in, timestamp: new Date(infos.timestamp) })
                this.mbs_out.push({ value: infos.mb_out, timestamp: new Date(infos.timestamp) })

                // Keep only the last 10 values
                if (this.mbs_in.length > 10) {
                    this.mbs_in.shift()
                    this.mbs_out.shift()
                }

                // Count the number of fetches
                this.nbFetch++

                //Store the data in a database OUT OF THE SCOPE
            }
            else {
                this.state = 'stopped'
                this.stop()
            }
            
        },
        async start() {
            this.state = 'fetching'
            while (this.state === 'fetching') {
                await this.fetch()
                await new Promise(resolve => setTimeout(resolve, 1000))
            }
        },
        stop() {
            this.state = 'stopped'
        }
    }
  })