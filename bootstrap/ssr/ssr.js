import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { Head, createInertiaApp } from "@inertiajs/react";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
import { useState } from "react";
//#region \0rolldown/runtime.js
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
//#endregion
//#region resources/js/Pages/Errors/NotFound.tsx
var NotFound_exports = /* @__PURE__ */ __exportAll({ default: () => NotFound });
function NotFound() {
	return /* @__PURE__ */ jsx("main", {
		className: "flex min-h-[calc(100vh-4.5rem)] w-full items-center px-5 py-16 sm:px-10",
		children: /* @__PURE__ */ jsxs("section", {
			className: "max-w-2xl",
			children: [
				/* @__PURE__ */ jsx("p", {
					className: "font-heading text-base font-semibold uppercase tracking-[0.18em] text-[#9d5f35]",
					children: "404"
				}),
				/* @__PURE__ */ jsx("h1", {
					className: "mt-4 font-heading text-5xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-6xl",
					children: "Page Not Found"
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-xl text-base leading-7 text-neutral-600",
					children: "This route does not exist or has moved. Head back to the homepage to continue browsing Petra."
				}),
				/* @__PURE__ */ jsx("a", {
					href: "/",
					className: "mt-8 inline-flex h-11 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29]",
					children: "Back to Homepage"
				})
			]
		})
	});
}
//#endregion
//#region resources/js/Components/coverage-map.tsx
function CoverageMap() {
	return /* @__PURE__ */ jsx("iframe", {
		title: "Google map showing Petra Industrial regional coverage",
		src: "https://maps.google.com/maps?ll=42.5,-108.5&z=5&t=m&output=embed",
		className: "absolute inset-0 h-full w-full grayscale",
		loading: "lazy",
		referrerPolicy: "no-referrer-when-downgrade"
	});
}
//#endregion
//#region resources/js/Components/home-icons.tsx
function FeatureIcon({ type, className = "h-5 w-5" }) {
	if (type === "badge") return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "M12 3.5 14.2 6l3.3-.3.6 3.2 2.7 1.8-1.6 2.9.8 3.2-3.2.9-1.8 2.8-3-1.5-3 1.5-1.8-2.8-3.2-.9.8-3.2-1.6-2.9 2.7-1.8.6-3.2 3.3.3L12 3.5Z",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ jsx("path", {
			d: "m8.8 12.2 2 2 4.4-4.6",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
	if (type === "truck") return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M4 7h10v9H4V7Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M14 10h3.4l2.6 3.1V16h-6v-6Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4ZM17 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z",
				stroke: "currentColor",
				strokeWidth: "1.8"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		className: `${className} text-[#a56437]`,
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "12",
			cy: "12",
			r: "8.2",
			stroke: "currentColor",
			strokeWidth: "1.8"
		}), /* @__PURE__ */ jsx("path", {
			d: "m8.7 12.1 2.1 2.1 4.6-4.8",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})]
	});
}
function CategoryIcon({ type }) {
	if (type === "loader") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M3.5 15.5h7.4l2.4-5.4h3.4l2.8 5.4h1",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M6.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2ZM16.3 18.5a2.1 2.1 0 1 0 0-4.2 2.1 2.1 0 0 0 0 4.2Z",
				stroke: "currentColor",
				strokeWidth: "1.8"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M13.5 10.1 10.8 7.4H8.2",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			})
		]
	});
	if (type === "dozer") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M4 16h9.2l2.2-4.5h2.9l1.7 4.5",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M3.5 17.5h16.8",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7.5 14.5V9.8h4.7l2.1 1.7",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M5.8 19.2h12.7",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			})
		]
	});
	if (type === "compaction") return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", {
				d: "M5 15.6h13.3l2.2-2.8v4.6H5v-1.8Z",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M8 15.6V8.5h5.7l2.1 2.5v4.6",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinejoin: "round"
			}),
			/* @__PURE__ */ jsx("path", {
				d: "M7.3 19.2h11.4",
				stroke: "currentColor",
				strokeWidth: "1.8",
				strokeLinecap: "round"
			})
		]
	});
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 text-[#b06b3d]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", {
			d: "m14.4 4.5 5.1 5.1-2.7 2.7-1.5-1.5-6.8 6.8-2.1-2.1 6.8-6.8-1.5-1.5 2.7-2.7Z",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinejoin: "round"
		}), /* @__PURE__ */ jsx("path", {
			d: "m4.5 19.5 4.1-4.1",
			stroke: "currentColor",
			strokeWidth: "1.8",
			strokeLinecap: "round"
		})]
	});
}
function AccentIcon$1({ type }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-12 w-12 text-[#a56437]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", {
			d: {
				sell: "M5 6h7.5l6.5 6.5-6.5 6.5L5 11.5V6Zm4 4h.01",
				search: "m20 20-4.2-4.2M10.8 18a7.2 7.2 0 1 1 0-14.4 7.2 7.2 0 0 1 0 14.4Z"
			}[type],
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
var home_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	stats: [
		{
			"value": "Field",
			"label": "Reality"
		},
		{
			"value": "Real",
			"label": "Buyers"
		},
		{
			"value": "Deals",
			"label": "Moving"
		},
		{
			"value": "Regional",
			"label": "Markets"
		}
	],
	featureItems: [
		{
			"label": "Straight Brokerage",
			"icon": "check"
		},
		{
			"label": "Real Buyers",
			"icon": "badge"
		},
		{
			"label": "Field Equipment",
			"icon": "truck"
		}
	],
	categories: [
		{
			"label": "Compressors",
			"icon": "tool",
			"imagePosition": "18% center"
		},
		{
			"label": "Separators",
			"icon": "loader",
			"imagePosition": "40% center"
		},
		{
			"label": "Tank Batteries",
			"icon": "dozer",
			"imagePosition": "64% center"
		},
		{
			"label": "Pump Packages",
			"icon": "compaction",
			"imagePosition": "86% center"
		}
	],
	processSteps: [
		{
			"number": "01",
			"title": "Tell Us",
			"description": "You tell us what you've got or what you need. No complicated forms, just the basics."
		},
		{
			"number": "02",
			"title": "Review",
			"description": "We review it, position it correctly, and identify where it fits in the market."
		},
		{
			"number": "03",
			"title": "Connect",
			"description": "We connect the right buyers and sellers, not everyone, just the ones who matter."
		},
		{
			"number": "04",
			"title": "Negotiation",
			"description": "We handle the back-and-forth around pricing, questions, negotiation, and documentation."
		},
		{
			"number": "05",
			"title": "Deal Done",
			"description": "Equipment moves, paperwork clears, and everyone moves on."
		}
	],
	inventoryItems: [
		{
			"title": "3-Phase Separator",
			"badge": "Available",
			"badgeStyle": "solid",
			"id": "PH-9902",
			"imagePosition": "22% center",
			"specs": [
				["Year", "2020"],
				["PSI", "1440 WP"],
				["Size", "36\" x 10'"],
				["Condition", "Certified"]
			]
		},
		{
			"title": "Ariel JGK/4 Compressor",
			"badge": "Market Movement",
			"badgeStyle": "primary",
			"id": "PH-1148",
			"imagePosition": "52% center",
			"specs": [
				["Year", "2018"],
				["HP", "3550"],
				["Hours", "4200"],
				["Stages", "2-Stage"]
			]
		},
		{
			"title": "Storage Tank Battery",
			"badge": "Available",
			"badgeStyle": "outline",
			"id": "PH-7761",
			"imagePosition": "80% center",
			"specs": [
				["Capacity", "400 BBL x 4"],
				["Material", "Fiberglass"],
				["Status", "Cleaned"],
				["Coating", "Internal"]
			]
		}
	],
	states: [
		"Wyoming Oilfields",
		"North Dakota Bakken",
		"Colorado Energy Corridors",
		"Utah & New Mexico",
		"Montana Industrial Yards",
		"Regional Surplus Yards"
	]
};
//#endregion
//#region resources/js/Pages/Home.tsx
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => Home });
var { heroImage, stats, featureItems, categories, processSteps, inventoryItems, states } = home_default;
var pageTitle = "Petra | Used Oilfield & Industrial Equipment Brokerage";
var pageDescription = "Petra connects real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions.";
function Home({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Organization",
			"@id": `${canonicalUrl}#organization`,
			name: "Petra",
			url: canonicalUrl,
			description: "Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding producing regions.",
			areaServed: [
				"Wyoming",
				"Rockies",
				"Bakken",
				"North Dakota",
				"Colorado",
				"Utah",
				"New Mexico",
				"Montana"
			],
			knowsAbout: [
				"Used oilfield equipment",
				"Industrial equipment brokerage",
				"Equipment sourcing",
				"Asset liquidation",
				"Equipment valuation"
			]
		}, {
			"@type": "WebSite",
			"@id": `${canonicalUrl}#website`,
			name: "Petra",
			url: canonicalUrl,
			publisher: { "@id": `${canonicalUrl}#organization` },
			description: pageDescription
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: pageTitle
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:type",
				content: "website"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:url",
				content: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:image:alt",
				content: "Used oilfield and industrial equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full",
		children: [
			/* @__PURE__ */ jsxs("section", {
				className: "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-5 py-20 text-center text-white sm:px-10",
				style: {
					backgroundImage: `url('${heroImage}')`,
					backgroundPosition: "center",
					backgroundSize: "cover"
				},
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 grayscale",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "absolute inset-0 bg-black/65",
						"aria-hidden": "true"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "relative z-10 flex w-full max-w-4xl flex-col items-center",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-8 flex flex-wrap justify-center gap-4",
								children: [/* @__PURE__ */ jsx("span", {
									className: "border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80",
									children: "Used Oilfield Equipment"
								}), /* @__PURE__ */ jsx("span", {
									className: "border border-white/30 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white/80",
									children: "Industrial Brokerage"
								})]
							}),
							/* @__PURE__ */ jsxs("h1", {
								className: "font-hero text-[2.65rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-white sm:text-[3.25rem] lg:text-[4rem]",
								children: [/* @__PURE__ */ jsx("span", {
									className: "block sm:whitespace-nowrap",
									children: "Got Equipment Sitting Idle"
								}), /* @__PURE__ */ jsx("span", {
									className: "block text-[#b06b3d]",
									children: "Out in the Field?"
								})]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-8 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg",
								children: "Petra helps you move equipment faster without the runaround. We connect real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, and surrounding producing regions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-12 flex w-full max-w-xs flex-col gap-4",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/inventory",
									className: "flex h-16 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
									children: "See Available Equipment"
								}), /* @__PURE__ */ jsx("a", {
									href: "/sell-equipment",
									className: "flex h-16 items-center justify-center border border-white/50 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white/10",
									children: "Sell Your Equipment"
								})]
							})
						]
					})
				]
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: [/* @__PURE__ */ jsx("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-2 gap-10 px-5 py-20 text-center sm:px-10 md:grid-cols-4 lg:py-24",
					children: stats.map((stat) => /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-[2.6rem] font-normal uppercase leading-none tracking-[0.03em] text-[#a56437] lg:text-[2.85rem]",
							children: stat.value
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-3 font-heading text-xl font-normal uppercase tracking-[0.08em] text-neutral-700",
							children: stat.label
						})]
					}, stat.label))
				}), /* @__PURE__ */ jsx("div", {
					className: "border-t border-[#dad5cb] bg-white py-8",
					children: /* @__PURE__ */ jsxs("div", {
						className: "mx-auto flex max-w-[1200px] flex-col items-start justify-between gap-8 px-5 sm:px-10 lg:flex-row lg:items-center",
						children: [/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-base font-semibold tracking-[0.08em] text-neutral-600 lg:whitespace-nowrap",
							children: "No auctions. No guessing games. No wasted time."
						}), /* @__PURE__ */ jsx("div", {
							className: "flex flex-col gap-5 sm:flex-row sm:flex-wrap lg:flex-nowrap lg:gap-10",
							children: featureItems.map((item) => /* @__PURE__ */ jsxs("div", {
								className: "flex items-center gap-3",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: item.icon,
									className: "h-5 w-5 shrink-0"
								}), /* @__PURE__ */ jsx("span", {
									className: "font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 lg:whitespace-nowrap",
									children: item.label
								})]
							}, item.label))
						})]
					})
				})]
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-16 text-center sm:mb-24",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Equipment Types"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "What We Actually Deal With"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mx-auto mt-6 max-w-2xl text-lg leading-8 text-neutral-600",
								children: "If it runs in the field, processes product, or moves production, we probably handle it."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "mt-6 flex justify-center",
								children: /* @__PURE__ */ jsx("a", {
									className: "border-b border-[#a56437] pb-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437] transition-colors hover:border-neutral-950 hover:text-neutral-950",
									href: "/inventory",
									children: "Browse Equipment"
								})
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-4 md:grid-cols-4",
						children: categories.map((category) => /* @__PURE__ */ jsxs("a", {
							href: "/inventory",
							className: "group relative h-[500px] cursor-pointer overflow-hidden bg-neutral-950",
							children: [
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 bg-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0",
									style: {
										backgroundImage: `url('${heroImage}')`,
										backgroundPosition: category.imagePosition
									},
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 bg-black/45 transition-colors group-hover:bg-black/25",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsx("div", {
									className: "absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-transparent",
									"aria-hidden": "true"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "absolute inset-0 flex flex-col items-center justify-end p-10",
									children: [/* @__PURE__ */ jsx("div", {
										className: "translate-y-4 transition-transform group-hover:translate-y-0",
										children: /* @__PURE__ */ jsx(CategoryIcon, { type: category.icon })
									}), /* @__PURE__ */ jsx("h4", {
										className: "mt-4 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-white",
										children: category.label
									})]
								})
							]
						}, category.label))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-y border-[#dad5cb] bg-white py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-20 text-center sm:mb-28",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Simple Version"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-4 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "How Petra Works"
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative",
						children: [/* @__PURE__ */ jsx("div", {
							className: "absolute left-0 top-8 hidden h-px w-full bg-[#dad5cb] md:block",
							"aria-hidden": "true"
						}), /* @__PURE__ */ jsx("div", {
							className: "relative z-10 grid grid-cols-1 gap-12 text-center md:grid-cols-5",
							children: processSteps.map((step, index) => /* @__PURE__ */ jsxs("div", {
								className: "flex flex-col items-center gap-8",
								children: [/* @__PURE__ */ jsx("div", {
									className: `flex h-16 w-16 items-center justify-center font-heading text-2xl font-semibold ${index === 0 ? "bg-[#a56437] text-white" : "border border-[#dad5cb] bg-white text-neutral-950"}`,
									children: step.number
								}), /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
									className: "mb-3 font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
									children: step.title
								}), /* @__PURE__ */ jsx("p", {
									className: "text-sm leading-6 text-neutral-600",
									children: step.description
								})] })]
							}, step.number))
						})]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-16 flex flex-col items-center justify-between gap-6 text-center md:mb-24 md:flex-row md:items-end md:text-left",
						children: [/* @__PURE__ */ jsxs("div", { children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Featured Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Real Equipment. Real Listings."
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg text-neutral-600",
								children: "Browse what is currently available or contact us if you're looking for something specific."
							})
						] }), /* @__PURE__ */ jsx("a", {
							href: "/inventory",
							className: "border border-neutral-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "View Equipment"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12",
						children: inventoryItems.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "group border border-[#dad5cb] bg-white transition-colors duration-500 hover:border-[#a56437]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-72 overflow-hidden bg-black",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0",
										style: {
											backgroundImage: `url('${heroImage}')`,
											backgroundPosition: item.imagePosition
										},
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: `absolute left-0 top-0 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-[0.08em] ${item.badgeStyle === "outline" ? "border border-[#a56437] bg-white/90 text-[#a56437]" : item.badgeStyle === "primary" ? "bg-[#a56437] text-white" : "bg-neutral-500 text-white"}`,
										children: item.badge
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-4 right-4 border border-white/20 bg-black/50 px-2 py-1 font-heading text-sm font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md",
										children: ["ID: ", item.id]
									})
								]
							}), /* @__PURE__ */ jsxs("div", {
								className: "p-8",
								children: [
									/* @__PURE__ */ jsx("h3", {
										className: "mb-6 border-b border-[#dad5cb] pb-4 font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
										children: item.title
									}),
									/* @__PURE__ */ jsx("div", {
										className: "mb-8 grid grid-cols-2 gap-y-6",
										children: item.specs.map(([label, value], index) => /* @__PURE__ */ jsxs("div", {
											className: "flex flex-col",
											children: [/* @__PURE__ */ jsx("span", {
												className: "font-heading text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500",
												children: label
											}), /* @__PURE__ */ jsx("span", {
												className: `font-heading text-base font-semibold ${index === 3 ? "text-[#a56437]" : "text-neutral-950"}`,
												children: value
											})]
										}, label))
									}),
									/* @__PURE__ */ jsx("a", {
										href: "/contact",
										className: "flex w-full items-center justify-center border border-[#dad5cb] bg-[#f3f1ec] py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
										children: "Request Details"
									})
								]
							})]
						}, item.id))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-y border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-10 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col border-b border-[#dad5cb] py-28 md:border-b-0 md:border-r md:py-40 md:pr-20",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-10 flex items-center gap-4",
								children: [/* @__PURE__ */ jsx(AccentIcon$1, { type: "sell" }), /* @__PURE__ */ jsx("div", { className: "h-px flex-grow bg-[#dad5cb]" })]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Selling Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
								children: "Sell Your Equipment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-10 text-lg leading-8 text-neutral-600",
								children: "Most companies do not lose money because the equipment is bad. They lose money because it sits too long, nobody markets it properly, or it is only shown to a small local network."
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mb-12 space-y-6",
								children: [/* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: "Get equipment in front of active buyers." })]
								}), /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: "Price it based on actual market movement, not guesswork." })]
								})]
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/sell-equipment",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
								children: "Sell Equipment"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col py-28 md:py-40 md:pl-20",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "mb-10 flex items-center gap-4",
								children: [/* @__PURE__ */ jsx("div", { className: "h-px flex-grow bg-[#dad5cb]" }), /* @__PURE__ */ jsx(AccentIcon$1, { type: "search" })]
							}),
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Looking for Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950",
								children: "Request Equipment"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-10 text-lg leading-8 text-neutral-600",
								children: "Most buyers do not need more listings. They need the right size, the right spec, the right condition, and someone who actually knows where to find it."
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mb-12 space-y-6",
								children: [/* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: "Tell us what you're trying to source." })]
								}), /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: "We work our network and come back with real options." })]
								})]
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start border border-neutral-950 px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Request Equipment"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-16 px-5 sm:px-10 md:grid-cols-12",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "md:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]",
								children: "Service Area"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mb-8 mt-6 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Where We Operate"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-12 text-lg leading-8 text-neutral-600",
								children: "We work across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards."
							}),
							/* @__PURE__ */ jsx("div", {
								className: "flex flex-col gap-6",
								children: states.map((state) => /* @__PURE__ */ jsxs("div", {
									className: "group flex items-center gap-4 border-b border-[#dad5cb] pb-4",
									children: [/* @__PURE__ */ jsx("div", { className: "h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("span", {
										className: "font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors group-hover:text-[#a56437]",
										children: state
									})]
								}, state))
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "relative h-[520px] overflow-hidden border border-[#dad5cb] bg-white md:col-span-7 lg:h-[650px]",
						children: [
							/* @__PURE__ */ jsx(CoverageMap, {}),
							/* @__PURE__ */ jsx("div", {
								className: "pointer-events-none absolute inset-0 bg-white/20",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "pointer-events-none absolute inset-6 border border-[#dad5cb]",
								"aria-hidden": "true"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-t border-[#dad5cb] bg-[#1c1a16] py-32 text-center text-white sm:py-40 lg:py-48",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-6 block font-heading text-sm font-semibold uppercase tracking-[0.3em] text-[#a56437]",
							children: "Let's Connect"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mb-10 font-heading text-4xl font-bold uppercase tracking-[0.12em] text-white sm:text-6xl",
							children: "Let's Move Something"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mb-16 max-w-2xl text-lg leading-8 text-white/80",
							children: "If you've got equipment to sell or you're trying to source something for a job, just reach out. We'll tell you straight up if we can help or not."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-col justify-center gap-6 md:flex-row md:gap-8",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-opacity hover:opacity-90 sm:px-16",
								children: "Talk to a Broker"
							}), /* @__PURE__ */ jsx("a", {
								href: "/inventory",
								className: "inline-flex h-16 items-center justify-center border border-white/50 px-12 font-heading text-base font-semibold uppercase tracking-[0.16em] text-white transition-colors hover:bg-white/10 sm:px-16",
								children: "Browse Equipment"
							})]
						})
					]
				})
			})
		]
	})] });
}
//#endregion
//#region resources/js/Components/footer.tsx
function AccentIcon({ type }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-12 w-12 text-[#a56437]",
		viewBox: "0 0 24 24",
		fill: "none",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", {
			d: {
				globe: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18Zm-8-9h16M12 3c2.3 2.4 3.4 5.4 3.4 9S14.3 18.6 12 21c-2.3-2.4-3.4-5.4-3.4-9S9.7 5.4 12 3Z",
				mail: "M4 6h16v12H4V6Zm0 1.5 8 5.5 8-5.5",
				call: "M6.7 4.5 9 4l2 4-1.7 1.2c.9 1.8 2.3 3.2 4.1 4.1L14.7 12l4 2-.5 2.3c-.2 1-1.1 1.7-2.1 1.7C9.4 18 6 14.6 6 7.9c0-1 .7-1.9 1.7-2.1Z"
			}[type],
			stroke: "currentColor",
			strokeWidth: "1.7",
			strokeLinecap: "round",
			strokeLinejoin: "round"
		})
	});
}
function Footer() {
	return /* @__PURE__ */ jsxs("footer", {
		className: "w-full border-t border-[#dad5cb] bg-white",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 py-20 sm:px-10 md:grid-cols-4 lg:py-24",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-8",
					children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("div", {
						className: "font-heading text-3xl font-semibold uppercase tracking-[0.2em] text-neutral-950",
						children: "PETRA"
					}), /* @__PURE__ */ jsx("div", { className: "mt-3 h-0.5 w-16 bg-[#a56437]" })] }), /* @__PURE__ */ jsx("p", {
						className: "leading-7 text-neutral-600",
						children: "Used oilfield and industrial equipment brokerage serving Wyoming, the Rockies, and surrounding producing regions."
					})]
				}),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
					children: "Navigation"
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex flex-col gap-4 text-neutral-600",
					children: [
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/inventory",
							children: "Browse Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/sell-equipment",
							children: "Sell Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/request-equipment",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/contact",
							children: "Contact"
						})
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
					className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
					children: "Legal"
				}), /* @__PURE__ */ jsxs("nav", {
					className: "flex flex-col gap-4 text-neutral-600",
					children: [
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/privacy",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/terms",
							children: "Terms of Service"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/cookies",
							children: "Cookie Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "transition-colors hover:text-[#a56437]",
							href: "/disclaimer",
							children: "Disclaimer"
						})
					]
				})] }),
				/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h3", {
						className: "mb-6 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950",
						children: "Service Area"
					}),
					/* @__PURE__ */ jsxs("p", {
						className: "leading-8 text-neutral-600",
						children: [
							"Wyoming oilfields",
							/* @__PURE__ */ jsx("br", {}),
							"Rockies and Bakken",
							/* @__PURE__ */ jsx("br", {}),
							"Regional surplus yards"
						]
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-6 flex gap-5 text-neutral-600",
						children: [
							/* @__PURE__ */ jsx(AccentIcon, { type: "globe" }),
							/* @__PURE__ */ jsx(AccentIcon, { type: "mail" }),
							/* @__PURE__ */ jsx(AccentIcon, { type: "call" })
						]
					})
				] })
			]
		}), /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-[1280px] border-t border-[#dad5cb]/60 px-5 py-10 text-center sm:px-10",
			children: /* @__PURE__ */ jsx("p", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.22em] text-neutral-500",
				children: "© 2024 PETRA Used Oilfield & Industrial Equipment Brokerage. All rights reserved."
			})
		})]
	});
}
//#endregion
//#region resources/js/Components/nav-bar.tsx
var navItems = [
	{
		label: "Home",
		href: "/"
	},
	{
		label: "Equipment",
		href: "/inventory"
	},
	{
		label: "Sell Equipment",
		href: "/sell-equipment"
	},
	{
		label: "Request Equipment",
		href: "/request-equipment"
	},
	{
		label: "Services",
		href: "/services"
	},
	{
		label: "Industries",
		href: "/industries"
	}
];
function isActivePath(href) {
	if (typeof window === "undefined") return href === "/";
	const currentPath = window.location.pathname;
	if (href === "/") return currentPath === "/";
	return currentPath.startsWith(href);
}
function NavBar() {
	const [menuOpen, setMenuOpen] = useState(false);
	return /* @__PURE__ */ jsxs("header", {
		className: "sticky top-0 z-50 w-full border-b border-neutral-300 bg-[#f8f8f6] shadow-[0_1px_0_rgba(255,255,255,0.7)_inset]",
		children: [/* @__PURE__ */ jsxs("nav", {
			"aria-label": "Primary navigation",
			className: "mx-auto grid min-h-18 w-full max-w-[1200px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-10 xl:px-0",
			children: [
				/* @__PURE__ */ jsx("a", {
					href: "/",
					className: "font-heading text-[1.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-950",
					"aria-label": "Petra home",
					children: "PETRA"
				}),
				/* @__PURE__ */ jsx("div", {
					className: "hidden items-stretch justify-center gap-8 self-stretch lg:flex",
					children: navItems.map((item) => {
						const active = isActivePath(item.href);
						return /* @__PURE__ */ jsxs("a", {
							href: item.href,
							"aria-current": active ? "page" : void 0,
							className: "relative flex items-center font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-600 transition-colors hover:text-neutral-950",
							children: [/* @__PURE__ */ jsx("span", { children: item.label }), active && /* @__PURE__ */ jsx("span", {
								className: "absolute bottom-4 left-0 h-0.5 w-full bg-[#9d5f35]",
								"aria-hidden": "true"
							})]
						}, item.href);
					})
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-center justify-end gap-3",
					children: [/* @__PURE__ */ jsx("a", {
						href: "/contact",
						className: "hidden h-10 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29] md:flex",
						children: "Talk to a Broker"
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						"aria-expanded": menuOpen,
						className: "flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-800 lg:hidden",
						"aria-label": "Open menu",
						onClick: () => setMenuOpen((isOpen) => !isOpen),
						children: /* @__PURE__ */ jsx("span", { className: "block h-0.5 w-5 bg-current before:block before:h-0.5 before:w-5 before:-translate-y-1.5 before:bg-current before:content-[''] after:block after:h-0.5 after:w-5 after:translate-y-1 after:bg-current after:content-['']" })
					})]
				})
			]
		}), menuOpen && /* @__PURE__ */ jsxs("div", {
			className: "w-full border-b border-neutral-300 bg-[#f8f8f6] px-5 py-4 shadow-sm sm:px-10 lg:hidden",
			children: [/* @__PURE__ */ jsx("div", {
				className: "flex flex-col gap-1",
				children: navItems.map((item) => {
					const active = isActivePath(item.href);
					return /* @__PURE__ */ jsx("a", {
						href: item.href,
						"aria-current": active ? "page" : void 0,
						className: `border-l-2 px-3 py-2 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors ${active ? "border-[#9d5f35] text-neutral-950" : "border-transparent text-neutral-600 hover:text-neutral-950"}`,
						children: item.label
					}, item.href);
				})
			}), /* @__PURE__ */ jsx("a", {
				href: "/contact",
				className: "mt-3 flex h-10 items-center justify-center bg-[#9d5f35] px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#874d29] md:hidden",
				children: "Talk to a Broker"
			})]
		})]
	});
}
//#endregion
//#region resources/js/Layouts/AppLayout.tsx
function AppLayout({ children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-transparent text-neutral-950",
		children: [
			/* @__PURE__ */ jsx(NavBar, {}),
			children,
			/* @__PURE__ */ jsx(Footer, {})
		]
	});
}
//#endregion
//#region resources/js/ssr.tsx
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	resolve: (name) => {
		const resolvedPage = (/* @__PURE__ */ Object.assign({
			"./Pages/Errors/NotFound.tsx": NotFound_exports,
			"./Pages/Home.tsx": Home_exports
		}))[`./Pages/${name}.tsx`];
		resolvedPage.default.layout ??= (pageContent) => /* @__PURE__ */ jsx(AppLayout, { children: pageContent });
		return resolvedPage;
	},
	setup({ App, props }) {
		return /* @__PURE__ */ jsx(App, { ...props });
	}
}));
//#endregion
export {};
