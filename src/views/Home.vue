<template>
	<div>
		<v-container v-if="listData" three-line>
			<v-row class="mt-16">
				<v-col
					v-for="(item, i) in listData"
					:key="`item-${i}`"
					cols="12"
					sm="4"
				>
					<div>
						<v-hover v-slot="{ hover }">
							<v-card class="mx-auto" max-width="344">
								<div @click="detailPush(item.id)">
									<v-img
										v-bind:src="item.thumbnail"
										:aspect-ratio="11 / 8"
										height="mx-auto"
									>
										<v-expand-transition>
											<div
												v-if="hover"
												class="d-flex transition-fast-in-fast-out orange darken-2 v-card--reveal display-3 white--text"
												style="height: 100%;"
											></div>
										</v-expand-transition>
									</v-img>

									<v-card-text class="pt-3" style="position: relative;">
										<v-card-text
											><div style="width: 100%">
												<div style="width: 50%; float: left">
													<h5>{{ item.userId.nickName }}</h5>
												</div>
												<div style="margin-left: 50%; text-align: right">
													<h3 color="343a40" class=" font-weight-bold mb-2">
														<div style="border:solid">
															{{ item.categoryId.subCategoryId.name }}/{{
																item.categoryId.name
															}}
														</div>
													</h3>
												</div>
											</div></v-card-text
										>
										<v-card-title
											><div>{{ item.title }}</div></v-card-title
										>
										<v-card-subtitle>
											<div class="font-weight-medium mb-2">
												{{ item.price | moneyFilter }} won
											</div>
										</v-card-subtitle>

										<v-card-text>
											<div style="width: 100%">
												<div style="width: 50%; float: left">
													{{ item.createAt | timeForToday }}
												</div>
												<div style="margin-left: 50%; text-align: right">
													<v-icon color="green">
														mdi-comment-text-multiple
													</v-icon>
													{{ item.commentCount }}
													<v-icon color="red">
														mdi-heart
													</v-icon>
													{{ item.likeCount }}
													<v-icon color="blue">
														mdi-eye-outline
													</v-icon>
													{{ item.views }}
												</div>
											</div>
										</v-card-text>
									</v-card-text>
								</div>
							</v-card>
						</v-hover>
					</div>
				</v-col>
			</v-row>
		</v-container>
		<infinite-loading
			@infinite="infiniteHandler"
			spinner="waveDots"
			forceUseInfiniteWrapper
			><div slot="no-more" class="ma-10">
				더이상 게시물이 존재하지 않습니다.
			</div>
			<div slot="no-results" class="ma-10">
				존재 하지 않습니다.
			</div></infinite-loading
		>
		<br />
		<br />
		<br />
	</div>
</template>

<script>
import { mapActions } from 'vuex';
import InfiniteLoading from 'vue-infinite-loading';
import http from '@/utils/http';
import dateFormatter from '@/mixin/dateFormatter';

export default {
	created() {
		console.log('시작!');
	},
	mixins: [dateFormatter],
	data() {
		return {
			limit: 1,
			listData: [],
		};
	},
	components: {
		InfiniteLoading,
	},
	computed: {},

	mounted() {
		this.init();
	},
	methods: {
		infiniteHandler($state) {
			http
				.process('boards', 'listPagenation', {
					limit: this.limit,
				})
				.then((res) => {
					console.log(res.boardResponseDtoList);
					console.log(res.boardResponseDtoList.length);
					setTimeout(() => {
						if (res.boardResponseDtoList.length) {
							this.listData = this.listData.concat(res.boardResponseDtoList);
							$state.loaded();
							this.limit += 1;
						} else {
							$state.complete();
							/*alert("더 이상 목록이 존재하지 않습니다.")*/
						}
					}, 500);
				})
				.catch((err) => {
					console.log(err);
				});
		},

		init() {
			console.log('home init...');
		},

		detailPush(id) {
			this.$router.push({ name: 'BoardDetail', params: { id: id } });
		},
		...mapActions({
			_getList: 'users/getList',
		}),
	},
};
</script>
<style>
.v-card--reveal {
	align-items: center;
	bottom: 0;
	justify-content: center;
	opacity: 0.5;
	position: absolute;
	width: 100%;
}
</style>
