import { Head, Link, createInertiaApp, router, useForm, usePage, useRemember } from "@inertiajs/react";
import { Fragment, jsx, jsxs } from "react/jsx-runtime";
import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { Toaster, toast } from "sonner";
import * as Dialog from "@radix-ui/react-dialog";
import createServer from "@inertiajs/react/server";
import { renderToString } from "react-dom/server";
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
var about_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	intro: [
		"Petra was built because equipment markets are fragmented and inefficient.",
		"Good equipment often sits idle while buyers struggle to find reliable sources.",
		"We bridge that gap."
	],
	beliefs: [
		"Straight communication",
		"Real market pricing",
		"No wasted time",
		"Relationship-based brokerage"
	],
	region: "Focused on Wyoming and surrounding producing regions including Rockies and adjacent energy markets."
};
//#endregion
//#region resources/js/Pages/About.tsx
var About_exports = /* @__PURE__ */ __exportAll({ default: () => About });
var { intro: intro$2, beliefs, region } = about_default;
var pageTitle$7 = "About | Petra";
var pageDescription$7 = "Petra was built because equipment markets are fragmented and inefficient. Good equipment often sits idle while buyers struggle to find reliable sources. We bridge that gap.";
function About({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "AboutPage",
			"@id": `${canonicalUrl}#about`,
			name: "About Petra",
			url: canonicalUrl,
			description: pageDescription$7,
			isPartOf: {
				"@type": "WebSite",
				name: "Petra",
				url: canonicalUrl.replace(/\/about$/, "")
			},
			about: {
				"@type": "Organization",
				name: "Petra",
				description: "Used oilfield and industrial equipment brokerage.",
				areaServed: region
			}
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/about$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "About",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$7,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$7
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
				content: pageTitle$7
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$7
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
				content: "Oilfield equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$7
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$7
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
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "About Petra"
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 max-w-3xl space-y-4",
							children: intro$2.map((paragraph) => /* @__PURE__ */ jsx("p", {
								className: "text-base font-medium leading-7 text-neutral-600 sm:text-lg",
								children: paragraph
							}, paragraph))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Talk to a Broker"
							}), /* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Browse Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mx-auto mb-9 max-w-3xl text-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]",
							children: "Our Standards"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl",
							children: "What We Believe"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4",
						children: beliefs.map((belief) => /* @__PURE__ */ jsxs("article", {
							className: "bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]",
							children: [/* @__PURE__ */ jsx("div", { className: "mb-5 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h3", {
								className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white",
								children: belief
							})]
						}, belief))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl lg:col-span-5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Coverage"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Region"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsx("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: /* @__PURE__ */ jsxs("div", {
								className: "flex items-start gap-4",
								children: [/* @__PURE__ */ jsx(FeatureIcon, {
									type: "check",
									className: "mt-1 h-5 w-5 shrink-0"
								}), /* @__PURE__ */ jsx("p", {
									className: "text-lg leading-8 text-neutral-700",
									children: region
								})]
							})
						})
					})]
				})
			})
		]
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/ForgotPassword.tsx
var ForgotPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ForgotPassword });
function ForgotPassword() {
	const { status } = usePage().props;
	const { data, setData, post, processing, errors } = useForm({ email: "" });
	function submit(event) {
		event.preventDefault();
		post("/forgot-password");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Forgot Password" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Account Access"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "Reset Password"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-base leading-7 text-neutral-600",
						children: "Enter your email and Petra will send a password reset link if the account exists."
					}),
					status && /* @__PURE__ */ jsx("div", {
						className: "mt-8 border border-[#a56437] bg-[#f3f1ec] p-4 text-base leading-7 text-neutral-700",
						children: status
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
						children: [/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								}),
								errors.email && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.email
								})
							]
						}), /* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center gap-4",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: processing ? "Sending" : "Send reset link"
							}), /* @__PURE__ */ jsx(Link, {
								href: "/login",
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-700 hover:text-neutral-950",
								children: "Back to login"
							})]
						})]
					})
				]
			})
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/Login.tsx
var Login_exports = /* @__PURE__ */ __exportAll({ default: () => Login });
function Login() {
	const { data, setData, post, processing, errors } = useForm({
		email: "",
		password: "",
		remember: false
	});
	function submit(event) {
		event.preventDefault();
		post("/login", { replace: true });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Customer Login" }), /* @__PURE__ */ jsx("main", {
		className: "flex min-h-[100svh] items-center justify-center bg-[#f3f1ec] px-3 py-3 text-neutral-950 sm:px-8 sm:py-8 lg:px-10",
		children: /* @__PURE__ */ jsxs("section", {
			className: "grid w-full max-w-[460px] overflow-hidden border border-[#dad5cb] bg-white shadow-[0_24px_80px_rgba(15,15,15,0.06)] lg:min-h-[560px] lg:max-w-[1120px] lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,0.8fr)]",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "flex flex-col justify-between gap-5 border-b border-[#dad5cb] bg-[#fbfaf7] p-5 sm:p-8 lg:border-b-0 lg:border-r lg:p-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx(Link, {
					href: "/",
					className: "focus-copper inline-block font-heading text-[1.4rem] font-semibold uppercase tracking-[0.22em] text-neutral-950 sm:text-[1.8rem]",
					children: "Petra"
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-5 max-w-[560px] sm:mt-8 lg:mt-20",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Customer Portal"
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "mt-2 font-heading text-4xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:mt-3 sm:text-5xl lg:mt-5 lg:text-7xl",
							children: "Login"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 hidden text-base font-medium leading-7 text-neutral-600 lg:block lg:text-lg",
							children: "Access seller and buyer workspace tools for saved equipment, quotes, offers, documents, and account details."
						})
					]
				})] }), /* @__PURE__ */ jsxs("div", {
					className: "hidden gap-3 text-sm leading-6 text-neutral-600 lg:grid lg:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "border border-[#dad5cb] bg-white p-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950",
							children: "Sellers"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Manage activity, saved equipment, profile details, and future deal workflows."
						})]
					}), /* @__PURE__ */ jsxs("div", {
						className: "border border-[#dad5cb] bg-white p-4",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-950",
							children: "Buyers"
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-2",
							children: "Track watched equipment, account details, and portal updates as features come online."
						})]
					})]
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "flex items-center bg-white p-5 sm:p-8 lg:p-12",
				children: /* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					className: "grid w-full gap-3.5 sm:gap-5",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "hidden sm:mb-2 sm:block",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]",
								children: "Secure Access"
							}), /* @__PURE__ */ jsx("h2", {
								className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:mt-3 sm:text-3xl",
								children: "Sign in"
							})]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Email"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input bg-[#fbfaf7]",
									autoComplete: "email",
									required: true
								}),
								errors.email && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.email
								})
							]
						}),
						/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
									children: "Password"
								}),
								/* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input bg-[#fbfaf7]",
									autoComplete: "current-password",
									required: true
								}),
								errors.password && /* @__PURE__ */ jsx("span", {
									className: "text-sm text-red-700",
									children: errors.password
								})
							]
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "flex flex-wrap items-center justify-between gap-4",
							children: [/* @__PURE__ */ jsxs("label", {
								className: "flex items-center gap-3 text-sm font-medium text-neutral-700",
								children: [/* @__PURE__ */ jsx("input", {
									type: "checkbox",
									checked: data.remember,
									onChange: (event) => setData("remember", event.target.checked),
									className: "h-4 w-4 accent-[#a56437]"
								}), "Remember me"]
							}), /* @__PURE__ */ jsx(Link, {
								href: "/forgot-password",
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]",
								children: "Forgot password"
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: processing,
							className: "button-press focus-copper mt-1 inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:mt-2 sm:h-14 sm:px-10",
							children: processing ? "Signing in" : "Sign in"
						}),
						/* @__PURE__ */ jsxs("p", {
							className: "mt-1 border-t border-[#dad5cb] pt-4 text-base leading-7 text-neutral-600 sm:mt-2 sm:pt-5",
							children: [
								"Need portal access?",
								" ",
								/* @__PURE__ */ jsx(Link, {
									href: "/register",
									className: "font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: "Register"
								})
							]
						})
					]
				})
			})]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Auth/Register.tsx
var Register_exports = /* @__PURE__ */ __exportAll({ default: () => Register });
function Register() {
	const { data, setData, post, processing, errors } = useForm({
		name: "",
		email: "",
		phone: "",
		company_name: "",
		user_type: "buyer",
		password: "",
		password_confirmation: ""
	});
	function submit(event) {
		event.preventDefault();
		post("/register", { replace: true });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Register" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[900px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Customer Portal"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "Register"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 text-base leading-7 text-neutral-600",
						children: "Create one Petra account and choose whether your primary portal context is seller or buyer. This can be extended later if the client wants fully separate account types."
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-10 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:grid-cols-2 sm:p-8",
						children: [
							/* @__PURE__ */ jsx(Field$6, {
								label: "Name",
								error: errors.name,
								children: /* @__PURE__ */ jsx("input", {
									value: data.name,
									onChange: (event) => setData("name", event.target.value),
									className: "portal-input",
									autoComplete: "name",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Email",
								error: errors.email,
								children: /* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Phone",
								error: errors.phone,
								children: /* @__PURE__ */ jsx("input", {
									value: data.phone,
									onChange: (event) => setData("phone", event.target.value),
									className: "portal-input",
									autoComplete: "tel"
								})
							}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Company",
								error: errors.company_name,
								children: /* @__PURE__ */ jsx("input", {
									value: data.company_name,
									onChange: (event) => setData("company_name", event.target.value),
									className: "portal-input",
									autoComplete: "organization"
								})
							}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Portal type",
								error: errors.user_type,
								children: /* @__PURE__ */ jsxs("select", {
									value: data.user_type,
									onChange: (event) => setData("user_type", event.target.value),
									className: "portal-input",
									children: [/* @__PURE__ */ jsx("option", {
										value: "buyer",
										children: "Buyer"
									}), /* @__PURE__ */ jsx("option", {
										value: "seller",
										children: "Seller"
									})]
								})
							}),
							/* @__PURE__ */ jsx("div", {}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Password",
								error: errors.password,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$6, {
								label: "Confirm password",
								error: errors.password_confirmation,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password_confirmation,
									onChange: (event) => setData("password_confirmation", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: processing,
									className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
									children: processing ? "Creating account" : "Create account"
								}), /* @__PURE__ */ jsxs("p", {
									className: "mt-5 text-base leading-7 text-neutral-600",
									children: [
										"Already have access?",
										" ",
										/* @__PURE__ */ jsx(Link, {
											href: "/login",
											className: "font-heading font-semibold uppercase tracking-[0.08em] text-neutral-950",
											children: "Login"
										})
									]
								})]
							})
						]
					})
				]
			})
		})
	})] });
}
function Field$6({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Auth/ResetPassword.tsx
var ResetPassword_exports = /* @__PURE__ */ __exportAll({ default: () => ResetPassword });
function ResetPassword({ email, token }) {
	const { data, setData, post, processing, errors } = useForm({
		token,
		email,
		password: "",
		password_confirmation: ""
	});
	function submit(event) {
		event.preventDefault();
		post("/reset-password");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Set New Password" }), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[760px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Account Access"
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
						children: "New Password"
					}),
					/* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "mt-8 grid gap-5 border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "hidden",
								value: data.token
							}),
							/* @__PURE__ */ jsx(Field$5, {
								label: "Email",
								error: errors.email,
								children: /* @__PURE__ */ jsx("input", {
									type: "email",
									value: data.email,
									onChange: (event) => setData("email", event.target.value),
									className: "portal-input",
									autoComplete: "email",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$5, {
								label: "Password",
								error: errors.password,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password,
									onChange: (event) => setData("password", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$5, {
								label: "Confirm password",
								error: errors.password_confirmation,
								children: /* @__PURE__ */ jsx("input", {
									type: "password",
									value: data.password_confirmation,
									onChange: (event) => setData("password_confirmation", event.target.value),
									className: "portal-input",
									autoComplete: "new-password",
									required: true
								})
							}),
							/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: processing,
								className: "button-press focus-copper inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: processing ? "Saving" : "Save password"
							})
						]
					})
				]
			})
		})
	})] });
}
function Field$5({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
//#endregion
//#region resources/js/Components/confirm-dialog.tsx
function ConfirmDialog({ open, title, description, confirmLabel, cancelLabel = "Cancel", onConfirm, onCancel }) {
	useEffect(() => {
		if (!open) return;
		function closeOnEscape(event) {
			if (event.key === "Escape") onCancel();
		}
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, [open, onCancel]);
	if (!open) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "fixed inset-0 z-[100] flex items-center justify-center bg-neutral-950/55 px-5 py-6",
		children: [/* @__PURE__ */ jsx("button", {
			type: "button",
			"aria-label": cancelLabel,
			className: "absolute inset-0 cursor-default",
			onClick: onCancel
		}), /* @__PURE__ */ jsxs("section", {
			role: "dialog",
			"aria-modal": "true",
			"aria-labelledby": "confirm-dialog-title",
			"aria-describedby": "confirm-dialog-description",
			className: "relative w-full max-w-md border border-[#dad5cb] bg-[#f8f8f6] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.22)]",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.18em] text-[#a56437]",
					children: "Petra Portal"
				}),
				/* @__PURE__ */ jsx("h2", {
					id: "confirm-dialog-title",
					className: "mt-3 font-heading text-3xl font-semibold uppercase leading-none tracking-[0.08em] text-neutral-950",
					children: title
				}),
				/* @__PURE__ */ jsx("p", {
					id: "confirm-dialog-description",
					className: "mt-4 text-base leading-7 text-neutral-600",
					children: description
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-7 grid grid-cols-2 gap-3",
					children: [/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onCancel,
						className: "button-press focus-copper inline-flex h-11 items-center justify-center border border-neutral-400 px-5 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-white",
						children: cancelLabel
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onConfirm,
						className: "button-press focus-copper inline-flex h-11 items-center justify-center bg-[#a56437] px-5 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
						children: confirmLabel
					})]
				})
			]
		})]
	});
}
/** Mirrors the `body` rule in StoreMessageRequest. */
var MAX_BODY_LENGTH = 5e3;
var ACCEPTED_ATTACHMENT_TYPES = ".jpg,.jpeg,.png,.webp,.heic,.heif,.pdf,image/*,application/pdf";
/** Mirrors App\Models\MessageAttachment::ALLOWED_EXTENSIONS. */
var ACCEPTED_EXTENSIONS = [
	"jpg",
	"jpeg",
	"png",
	"webp",
	"heic",
	"heif",
	"pdf"
];
/**
* Sent on visits that should not show navigation chrome — read by BlankLayout so
* sending a message does not dim the page behind the composer.
*/
var QUIET_VISIT_HEADERS = { "X-Petra-Quiet-Visit": "1" };
/**
* Cancellation handle for the in-flight thread poll.
*
* The 20s poll and sending a message are separate Inertia visits, so they can
* overlap: a poll fired a moment before you hit Send is still fetching the
* pre-send state, and if its response lands after the send's, it overwrites the
* props and the message you just sent vanishes from the transcript until the next
* poll. The row is safely in the database the whole time — it is purely the
* rendered state going backwards.
*
* The composer cancels any active poll before posting, so a stale response can
* never win that race.
*/
var cancelActivePoll = null;
function registerPollCancel(cancel) {
	cancelActivePoll = cancel;
}
function cancelActivePolling() {
	cancelActivePoll?.();
	cancelActivePoll = null;
}
function formatFileSize$1(bytes) {
	if (bytes === null) return "";
	if (bytes < 1024) return `${bytes} B`;
	if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
//#endregion
//#region resources/js/Components/attachment-picker.tsx
/**
* The picker is split into a trigger and a list so the composer can put the button
* inline with Send while the selected files sit above it. Keeping them as one block
* cost a whole extra row of composer height, which comes straight out of the
* transcript on a laptop screen.
*/
function AttachmentTrigger({ files, max, onChange, onReject }) {
	function addFiles(picked) {
		const accepted = [];
		const rejected = [];
		for (const file of picked) {
			const extension = file.name.split(".").pop()?.toLowerCase() ?? "";
			if (!ACCEPTED_EXTENSIONS.includes(extension)) {
				rejected.push(`${file.name} is not an accepted type`);
				continue;
			}
			if (file.size > 10485760) {
				rejected.push(`${file.name} is larger than 10MB`);
				continue;
			}
			accepted.push(file);
		}
		const combined = [...files, ...accepted];
		if (combined.length > max) rejected.push(`You can attach at most ${max} files to one message`);
		if (rejected.length > 0) onReject(rejected.join(". "));
		onChange(combined.slice(0, max));
	}
	return /* @__PURE__ */ jsxs("label", {
		title: "Attach images or PDFs (max 10MB each)",
		className: "button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 flex h-9 w-9 shrink-0 cursor-pointer items-center justify-center rounded-lg border border-[#dad5cb] bg-white text-neutral-500 transition-colors hover:border-[#a56437] hover:text-[#a56437]",
		children: [
			/* @__PURE__ */ jsx("input", {
				type: "file",
				multiple: true,
				accept: ACCEPTED_ATTACHMENT_TYPES,
				onChange: (event) => {
					addFiles(Array.from(event.target.files ?? []));
					event.currentTarget.value = "";
				},
				className: "sr-only"
			}),
			/* @__PURE__ */ jsx("span", {
				className: "sr-only",
				children: "Attach files"
			}),
			/* @__PURE__ */ jsx(PaperclipIcon, {})
		]
	});
}
function AttachmentList({ files, onChange }) {
	const [previews, setPreviews] = useState([]);
	useEffect(() => {
		const next = files.filter((file) => file.type.startsWith("image/")).map((file) => ({
			file,
			url: URL.createObjectURL(file)
		}));
		setPreviews(next);
		return () => {
			next.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [files]);
	if (files.length === 0) return null;
	return /* @__PURE__ */ jsx("ul", {
		className: "flex flex-wrap gap-1.5",
		children: files.map((file, index) => {
			const preview = previews.find((item) => item.file === file);
			return /* @__PURE__ */ jsxs("li", {
				className: "flex max-w-full items-center gap-2 rounded-lg border border-[#dad5cb] bg-white py-1 pl-1 pr-2",
				children: [
					preview ? /* @__PURE__ */ jsx("img", {
						src: preview.url,
						alt: "",
						className: "h-7 w-7 shrink-0 rounded object-cover"
					}) : /* @__PURE__ */ jsx("span", {
						className: "flex h-7 w-7 shrink-0 items-center justify-center rounded bg-[#f3f1ec] font-heading text-[0.5rem] font-semibold uppercase text-neutral-500",
						children: "PDF"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 truncate text-xs font-medium text-neutral-800",
						children: file.name
					}),
					/* @__PURE__ */ jsx("span", {
						className: "shrink-0 text-[0.65rem] text-neutral-400",
						children: formatFileSize$1(file.size)
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onChange(files.filter((_, fileIndex) => fileIndex !== index)),
						"aria-label": `Remove ${file.name}`,
						className: "focus-copper shrink-0 text-neutral-400 transition-colors hover:text-[#b3261e]",
						children: /* @__PURE__ */ jsx(CloseIcon$3, {})
					})
				]
			}, `${file.name}-${file.lastModified}-${index}`);
		})
	});
}
function CloseIcon$3() {
	return /* @__PURE__ */ jsx("svg", {
		width: "14",
		height: "14",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2.5",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M18 6 6 18M6 6l12 12" })
	});
}
function PaperclipIcon() {
	return /* @__PURE__ */ jsx("svg", {
		width: "16",
		height: "16",
		viewBox: "0 0 24 24",
		fill: "none",
		stroke: "currentColor",
		strokeWidth: "2",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" })
	});
}
//#endregion
//#region resources/js/Components/message-composer.tsx
/**
* The message input, shared by both sides.
*
* Enter inserts a newline and never submits — equipment questions run long and
* contain lists, and a stray Enter mid-thought sending a half-written message is
* worse than requiring a deliberate click. Submission is the button only.
*/
function MessageComposer({ action, toolbar, placeholder, disabledNotice }) {
	const textareaRef = useRef(null);
	const form = useForm({
		body: "",
		attachments: []
	});
	useEffect(() => {
		const firstError = Object.values(form.errors)[0];
		if (firstError) toast.error(firstError);
	}, [form.errors]);
	function insertAtCursor(text) {
		const textarea = textareaRef.current;
		if (!textarea) {
			form.setData("body", form.data.body ? `${form.data.body}\n\n${text}` : text);
			return;
		}
		const { selectionStart, selectionEnd } = textarea;
		const current = form.data.body;
		const next = `${current.slice(0, selectionStart)}${text}${current.slice(selectionEnd)}`;
		form.setData("body", next.slice(0, MAX_BODY_LENGTH));
		window.requestAnimationFrame(() => {
			textarea.focus();
			const caret = selectionStart + text.length;
			textarea.setSelectionRange(caret, caret);
		});
	}
	function submit(event) {
		event.preventDefault();
		if (form.processing) return;
		if (!(form.data.body.trim() !== "") && form.data.attachments.length === 0) {
			toast.error("Write a message or attach a file.");
			return;
		}
		cancelActivePolling();
		form.post(action, {
			forceFormData: true,
			preserveScroll: true,
			headers: QUIET_VISIT_HEADERS,
			onSuccess: () => form.reset()
		});
	}
	if (disabledNotice) return /* @__PURE__ */ jsx("div", {
		className: "border-t border-[#ece7dd] bg-[#f9f7f3] px-4 py-4 text-sm text-neutral-600 sm:px-6",
		children: disabledNotice
	});
	const remaining = MAX_BODY_LENGTH - form.data.body.length;
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		className: "grid gap-2 border-t border-[#ece7dd] bg-white px-3 py-3 sm:px-4",
		children: [
			toolbar && /* @__PURE__ */ jsx("div", {
				className: "-mx-1 flex gap-1.5 overflow-x-auto px-1 pb-0.5 [scrollbar-width:thin]",
				children: toolbar(insertAtCursor)
			}),
			/* @__PURE__ */ jsx("textarea", {
				ref: textareaRef,
				value: form.data.body,
				maxLength: MAX_BODY_LENGTH,
				onChange: (event) => form.setData("body", event.target.value),
				rows: 2,
				placeholder: placeholder ?? "Write a message…",
				className: "focus-copper max-h-40 w-full resize-y rounded-lg border border-[#dad5cb] bg-white px-3 py-2 text-sm leading-6 text-neutral-900 placeholder:text-neutral-400"
			}),
			/* @__PURE__ */ jsx(AttachmentList, {
				files: form.data.attachments,
				onChange: (files) => form.setData("attachments", files)
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center gap-2",
				children: [
					/* @__PURE__ */ jsx(AttachmentTrigger, {
						files: form.data.attachments,
						max: 8,
						onChange: (files) => form.setData("attachments", files),
						onReject: (message) => toast.error(message)
					}),
					/* @__PURE__ */ jsx("span", {
						className: "min-w-0 flex-1 truncate text-xs text-neutral-400",
						children: remaining < 500 ? `${remaining} characters left` : "Enter adds a new line"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						className: "button-press focus-copper h-9 shrink-0 rounded-lg bg-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white transition-colors hover:bg-[#8a5330]",
						children: "Send"
					})
				]
			})
		]
	});
}
//#endregion
//#region resources/js/Components/message-thread.tsx
function dayKey(iso) {
	return new Date(iso).toDateString();
}
function formatDaySeparator(iso) {
	const date = new Date(iso);
	const today = /* @__PURE__ */ new Date();
	const yesterday = /* @__PURE__ */ new Date();
	yesterday.setDate(today.getDate() - 1);
	if (date.toDateString() === today.toDateString()) return "Today";
	if (date.toDateString() === yesterday.toDateString()) return "Yesterday";
	return date.toLocaleDateString(void 0, {
		month: "long",
		day: "numeric",
		year: "numeric"
	});
}
function formatTime(iso) {
	return new Date(iso).toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
}
/**
* Consecutive messages from one side collapse into a run.
*
* A run breaks on a change of sender, a new day, or a gap long enough that the
* two messages are not really the same thought. Without this the transcript
* repeats "Petra" above every single bubble, which is noise: in a two-party
* thread the alignment and colour already say who is speaking, so the name only
* earns its space when the speaker actually changes.
*/
var RUN_GAP_MS = 300 * 1e3;
function groupMessages(messages) {
	return messages.map((message, index) => {
		const previous = index > 0 ? messages[index - 1] : null;
		const next = index < messages.length - 1 ? messages[index + 1] : null;
		const startsDay = previous === null || dayKey(previous.createdAt) !== dayKey(message.createdAt);
		return {
			message,
			startsRun: previous === null || previous.senderType !== message.senderType || startsDay || new Date(message.createdAt).getTime() - new Date(previous.createdAt).getTime() > RUN_GAP_MS,
			endsRun: next === null || next.senderType !== message.senderType || dayKey(next.createdAt) !== dayKey(message.createdAt) || new Date(next.createdAt).getTime() - new Date(message.createdAt).getTime() > RUN_GAP_MS,
			startsDay
		};
	});
}
/**
* Square off the corners facing the rest of a run, so stacked bubbles read as one
* block instead of a column of separate pills.
*/
function bubbleShape(mine, startsRun, endsRun) {
	const corners = ["rounded-xl"];
	if (!startsRun) corners.push(mine ? "rounded-tr-sm" : "rounded-tl-sm");
	if (!endsRun) corners.push(mine ? "rounded-br-sm" : "rounded-bl-sm");
	return corners.join(" ");
}
function DaySeparator({ iso }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "my-4 flex items-center gap-3 first:mt-0",
		children: [
			/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-[#e4dfd5]" }),
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-[0.65rem] font-semibold uppercase tracking-[0.14em] text-neutral-400",
				children: formatDaySeparator(iso)
			}),
			/* @__PURE__ */ jsx("span", { className: "h-px flex-1 bg-[#e4dfd5]" })
		]
	});
}
function MessageThread({ page, onNewMessages, emptyLabel }) {
	const scrollRef = useRef(null);
	const lastSeenId = useRef(null);
	const messages = page.items;
	const latestId = messages.length > 0 ? messages[messages.length - 1].id : null;
	useEffect(() => {
		if (latestId === null) return;
		if (lastSeenId.current !== latestId) {
			scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
			if (lastSeenId.current !== null) onNewMessages?.(latestId);
			lastSeenId.current = latestId;
		}
	}, [latestId, onNewMessages]);
	if (messages.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "flex flex-1 items-center justify-center p-8 text-center text-sm leading-6 text-neutral-500",
		children: emptyLabel ?? "No messages in this conversation yet."
	});
	const grouped = groupMessages(messages);
	return /* @__PURE__ */ jsxs("div", {
		ref: scrollRef,
		className: "flex-1 overflow-y-auto px-4 py-5 sm:px-6",
		children: [page.hasOlder && /* @__PURE__ */ jsxs("p", {
			className: "mb-5 text-center text-xs text-neutral-500",
			children: [
				"Showing the most recent ",
				page.items.length,
				" of ",
				page.total,
				" messages."
			]
		}), /* @__PURE__ */ jsx("ol", {
			className: "grid",
			children: grouped.map(({ message, startsRun, endsRun, startsDay }) => /* @__PURE__ */ jsxs("li", {
				className: startsRun ? "mt-4 first:mt-0" : "mt-0.5",
				children: [
					startsDay && /* @__PURE__ */ jsx(DaySeparator, { iso: message.createdAt }),
					startsRun && !message.mine && /* @__PURE__ */ jsx("p", {
						className: "mb-1 ml-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: message.authorName
					}),
					/* @__PURE__ */ jsx("div", {
						className: `flex ${message.mine ? "justify-end" : "justify-start"}`,
						children: /* @__PURE__ */ jsxs("div", {
							className: `max-w-[85%] px-4 py-2.5 sm:max-w-[70%] ${bubbleShape(message.mine, startsRun, endsRun)} ${message.mine ? "bg-[#a56437] text-white" : "border border-[#dad5cb] bg-white text-neutral-900"}`,
							children: [message.body && /* @__PURE__ */ jsx("p", {
								className: "whitespace-pre-wrap break-words text-sm leading-6",
								children: message.body
							}), message.attachments.length > 0 && /* @__PURE__ */ jsx("ul", {
								className: `grid gap-2 ${message.body ? "mt-2" : ""}`,
								children: message.attachments.map((attachment) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(AttachmentView, {
									attachment,
									mine: message.mine
								}) }, attachment.id))
							})]
						})
					}),
					endsRun && /* @__PURE__ */ jsx("p", {
						className: `mt-1 text-[0.7rem] text-neutral-400 ${message.mine ? "pr-1 text-right" : "pl-1"}`,
						children: formatTime(message.createdAt)
					})
				]
			}, message.id))
		})]
	});
}
function AttachmentView({ attachment, mine }) {
	if (!attachment.available) return /* @__PURE__ */ jsx("span", {
		className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${mine ? "bg-white/10 text-white/70" : "bg-[#f3f1ec] text-neutral-500"}`,
		children: /* @__PURE__ */ jsxs("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block truncate line-through",
				children: attachment.name
			}), /* @__PURE__ */ jsx("span", {
				className: `block text-xs ${mine ? "text-white/60" : "text-neutral-400"}`,
				children: "File no longer available"
			})]
		})
	});
	if (attachment.isImage) return /* @__PURE__ */ jsx("a", {
		href: attachment.url,
		target: "_blank",
		rel: "noreferrer",
		className: "block overflow-hidden rounded-lg",
		children: /* @__PURE__ */ jsx("img", {
			src: attachment.url,
			alt: attachment.name,
			className: "max-h-64 w-full object-cover",
			loading: "lazy"
		})
	});
	return /* @__PURE__ */ jsxs("a", {
		href: attachment.url,
		target: "_blank",
		rel: "noreferrer",
		className: `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors ${mine ? "bg-white/15 text-white hover:bg-white/25" : "bg-[#f3f1ec] text-neutral-800 hover:bg-[#ece7dd]"}`,
		children: [/* @__PURE__ */ jsx("span", {
			className: `flex h-8 w-8 shrink-0 items-center justify-center rounded font-heading text-[0.55rem] font-semibold uppercase ${mine ? "bg-white/20" : "bg-white"}`,
			children: "PDF"
		}), /* @__PURE__ */ jsxs("span", {
			className: "min-w-0 flex-1",
			children: [/* @__PURE__ */ jsx("span", {
				className: "block truncate font-semibold",
				children: attachment.name
			}), /* @__PURE__ */ jsx("span", {
				className: `block text-xs ${mine ? "text-white/70" : "text-neutral-500"}`,
				children: formatFileSize$1(attachment.size)
			})]
		})]
	});
}
//#endregion
//#region resources/js/Components/portal-page-header.tsx
function PortalPageHeader({ eyebrow, title, description, actions }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "flex flex-col gap-4 rounded-xl border border-[#dad5cb] bg-white px-5 py-4 shadow-sm lg:flex-row lg:items-center lg:justify-between lg:px-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "min-w-0",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-xs font-semibold uppercase tracking-[0.2em] text-[#a56437]",
					children: eyebrow
				}),
				/* @__PURE__ */ jsx("h2", {
					className: "mt-1 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: title
				}),
				description && /* @__PURE__ */ jsx("p", {
					className: "mt-1 text-sm leading-6 text-neutral-500",
					children: description
				})
			]
		}), actions && /* @__PURE__ */ jsx("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-center",
			children: actions
		})]
	});
}
/**
* Standard action button styling for the header's right-hand slot, sized to the compact
* header (h-11, matching the search field on My Listings).
*/
var portalHeaderActionClass = "button-press focus-copper inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto";
//#endregion
//#region resources/js/Components/portal-sidebar.tsx
var sellerNavGroups = [
	{
		label: "Main Menu",
		items: [
			{
				label: "Dashboard",
				path: "dashboard",
				real: true,
				icon: "dashboard"
			},
			{
				label: "My Listings",
				path: "listings",
				real: true,
				icon: "equipment"
			},
			{
				label: "Quotes",
				path: "quotes",
				real: false,
				icon: "quotes"
			},
			{
				label: "Offers",
				path: "offers",
				real: true,
				icon: "offers"
			}
		]
	},
	{
		label: "Other",
		items: [{
			label: "Documents",
			path: "documents",
			real: false,
			icon: "documents"
		}, {
			label: "Messages",
			path: "messages",
			real: true,
			icon: "messages",
			badge: "unread"
		}]
	},
	{
		label: "Account",
		items: [{
			label: "Profile",
			path: "profile",
			real: true,
			icon: "profile"
		}]
	}
];
var buyerNavGroups = [
	{
		label: "Main Menu",
		items: [
			{
				label: "Dashboard",
				path: "dashboard",
				real: true,
				icon: "dashboard"
			},
			{
				label: "My Requests",
				path: "requests",
				real: true,
				icon: "equipment"
			},
			{
				label: "Saved Equipment",
				path: "saved-equipment",
				real: false,
				icon: "equipment"
			},
			{
				label: "Quotes",
				path: "quotes",
				real: true,
				icon: "quotes"
			}
		]
	},
	{
		label: "Other",
		items: [
			{
				label: "Documents",
				path: "documents",
				real: false,
				icon: "documents"
			},
			{
				label: "Messages",
				path: "messages",
				real: true,
				icon: "messages",
				badge: "unread"
			},
			{
				label: "Notifications",
				path: "notifications",
				real: false,
				icon: "notifications"
			}
		]
	},
	{
		label: "Account",
		items: [{
			label: "Profile",
			path: "profile",
			real: true,
			icon: "profile"
		}]
	}
];
var brokerNavGroups = [{
	label: "Main Menu",
	items: [
		{
			label: "Seller Submissions",
			path: "submissions",
			real: true,
			icon: "equipment"
		},
		{
			label: "Buyer Requests",
			path: "requests",
			real: true,
			icon: "quotes"
		},
		{
			label: "Leads",
			path: "leads",
			real: true,
			icon: "leads"
		},
		{
			label: "Inbox",
			path: "inbox",
			real: true,
			icon: "messages",
			badge: "unread"
		}
	]
}, {
	label: "Account",
	items: [{
		label: "Profile",
		path: "profile",
		real: true,
		icon: "profile"
	}]
}];
function hrefFor(portal, path) {
	if (path === "dashboard") return `/${portal.userType}/dashboard`;
	return `/${portal.userType}/${path}`;
}
/**
* Where the logo links back to. Sellers and buyers land on a dashboard; brokers have
* none, so they go to the seller review queue instead of a /broker/dashboard 404.
*/
function portalHome(portal) {
	return portal.userType === "broker" ? "/broker/submissions" : `/${portal.userType}/dashboard`;
}
function navGroupsFor(portal) {
	switch (portal.userType) {
		case "seller": return sellerNavGroups;
		case "broker": return brokerNavGroups;
		default: return buyerNavGroups;
	}
}
function PortalSidebar({ portal, collapsed, onToggleCollapsed, onLogout }) {
	const page = usePage();
	const { auth } = page.props;
	const unreadThreads = page.props.unreadMessageThreads ?? 0;
	const currentPath = page.url.split("?")[0];
	const userName = auth.user?.name ?? portal.profileName;
	const userInitial = (userName ?? portal.roleLabel).charAt(0).toUpperCase();
	const navGroups = navGroupsFor(portal);
	return /* @__PURE__ */ jsxs("aside", {
		className: "border-b border-[#dad5cb] bg-white text-neutral-900 lg:sticky lg:top-0 lg:flex lg:h-screen lg:flex-col lg:self-start lg:border-b-0 lg:border-r",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: `flex items-center gap-3 border-b border-[#ece7dd] px-5 py-4 lg:min-h-[72px] lg:py-3 ${collapsed ? "lg:flex-col lg:justify-center lg:gap-2 lg:px-2" : "justify-between lg:px-5"}`,
				children: [/* @__PURE__ */ jsxs(Link, {
					href: portalHome(portal),
					className: "focus-copper flex min-w-0 items-center gap-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a56437] font-heading text-xl font-bold uppercase leading-none text-white",
						children: "P"
					}), /* @__PURE__ */ jsxs("span", {
						className: `min-w-0 ${collapsed ? "lg:hidden" : ""}`,
						children: [/* @__PURE__ */ jsx("span", {
							className: "block truncate font-heading text-xl font-semibold uppercase leading-none tracking-[0.18em] text-neutral-950",
							children: "Petra"
						}), /* @__PURE__ */ jsxs("span", {
							className: "mt-1 block truncate font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-400",
							children: [portal.roleLabel, " Portal"]
						})]
					})]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onToggleCollapsed,
					"aria-label": collapsed ? "Expand sidebar" : "Collapse sidebar",
					className: "focus-copper hidden h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-[#dad5cb] text-neutral-500 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-900 lg:flex",
					children: /* @__PURE__ */ jsx(SidebarToggleIcon, { collapsed })
				})]
			}),
			/* @__PURE__ */ jsx("nav", {
				"aria-label": `${portal.roleLabel} portal navigation`,
				className: "overflow-x-auto lg:flex-1 lg:overflow-x-visible lg:overflow-y-auto",
				children: /* @__PURE__ */ jsx("div", {
					className: "flex min-w-max gap-1 p-3 lg:min-w-0 lg:flex-col lg:gap-0 lg:p-3",
					children: navGroups.map((group, groupIndex) => /* @__PURE__ */ jsxs("div", {
						className: "flex gap-1 lg:flex-col lg:gap-1",
						children: [collapsed ? groupIndex > 0 && /* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "hidden lg:mx-2 lg:my-2 lg:block lg:h-px lg:bg-[#ece7dd]"
						}) : /* @__PURE__ */ jsx("span", {
							className: `hidden px-3 pb-1 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.18em] text-neutral-400 lg:block ${groupIndex === 0 ? "pt-1" : "pt-4"}`,
							children: group.label
						}), group.items.map((item) => {
							const href = hrefFor(portal, item.path);
							const active = currentPath === href || currentPath.startsWith(`${href}/`);
							const badgeCount = item.badge === "unread" ? unreadThreads : 0;
							return /* @__PURE__ */ jsxs(Link, {
								href,
								"aria-current": active ? "page" : void 0,
								title: collapsed ? item.label : void 0,
								className: `group flex min-h-11 items-center gap-3 rounded-lg px-3 py-2.5 font-heading text-[0.9rem] font-semibold uppercase tracking-[0.06em] transition-colors ${collapsed ? "lg:justify-center lg:px-0" : "justify-between"} ${active ? "bg-[#f4ece4] text-[#8a5330]" : "text-neutral-600 hover:bg-[#f3f1ec] hover:text-neutral-900"}`,
								children: [
									/* @__PURE__ */ jsxs("span", {
										className: "flex min-w-0 items-center gap-3",
										children: [/* @__PURE__ */ jsx("span", {
											className: active ? "text-[#a56437]" : "text-neutral-400 group-hover:text-neutral-600",
											children: /* @__PURE__ */ jsx(PortalNavIcon, { name: item.icon })
										}), /* @__PURE__ */ jsx("span", {
											className: `truncate ${collapsed ? "lg:hidden" : ""}`,
											children: item.label
										})]
									}),
									!item.real && /* @__PURE__ */ jsx("span", {
										className: `rounded-full px-2 py-0.5 text-[0.6rem] font-semibold uppercase tracking-[0.1em] ${active ? "bg-[#a56437]/15 text-[#8a5330]" : "bg-neutral-100 text-neutral-400"} ${collapsed ? "lg:hidden" : ""}`,
										children: "Soon"
									}),
									item.real && badgeCount > 0 && /* @__PURE__ */ jsx("span", {
										className: "ml-auto flex min-w-5 shrink-0 items-center justify-center rounded-full bg-[#a56437] px-1.5 py-0.5 text-[0.65rem] font-semibold leading-none text-white lg:ml-0",
										"aria-label": `${badgeCount} unread ${badgeCount === 1 ? "conversation" : "conversations"}`,
										children: badgeCount > 99 ? "99+" : badgeCount
									})
								]
							}, item.path);
						})]
					}, group.label))
				})
			}),
			/* @__PURE__ */ jsx("div", {
				className: `hidden border-t border-[#ece7dd] lg:block ${collapsed ? "lg:p-2" : "lg:p-4"}`,
				children: /* @__PURE__ */ jsxs("div", {
					className: `flex items-center rounded-xl border border-[#dad5cb] bg-[#f9f7f3] ${collapsed ? "lg:justify-center lg:p-2" : "gap-3 p-3"}`,
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#a56437] font-heading text-lg font-semibold uppercase text-white",
						children: userInitial
					}), !collapsed && /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("span", {
						className: "min-w-0 flex-1",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block truncate text-sm font-semibold text-neutral-900",
							children: userName
						}), /* @__PURE__ */ jsx("span", {
							className: "mt-0.5 block font-heading text-[0.7rem] font-semibold uppercase tracking-[0.16em] text-neutral-400",
							children: portal.roleLabel
						})]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: onLogout,
						"aria-label": "Log out",
						title: "Log out",
						className: "focus-copper flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border border-transparent text-neutral-400 transition-colors hover:border-[#dad5cb] hover:bg-white hover:text-[#a56437]",
						children: /* @__PURE__ */ jsx(LogoutIcon, {})
					})] })]
				})
			})
		]
	});
}
function SidebarToggleIcon({ collapsed }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: collapsed ? /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" }) : /* @__PURE__ */ jsx("path", { d: "M15 6l-6 6 6 6" })
	});
}
function LogoutIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M15 12H4" }),
			/* @__PURE__ */ jsx("path", { d: "M8 8l-4 4 4 4" }),
			/* @__PURE__ */ jsx("path", { d: "M12 4h6a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" })
		]
	});
}
function PortalNavIcon({ name }) {
	const common = {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": true
	};
	switch (name) {
		case "dashboard": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M4 13h6V4H4z" }),
				/* @__PURE__ */ jsx("path", { d: "M14 20h6v-9h-6z" }),
				/* @__PURE__ */ jsx("path", { d: "M4 20h6v-4H4z" }),
				/* @__PURE__ */ jsx("path", { d: "M14 7h6V4h-6z" })
			]
		});
		case "equipment": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M4 16h16" }),
				/* @__PURE__ */ jsx("path", { d: "M6 16l2-6h8l2 6" }),
				/* @__PURE__ */ jsx("path", { d: "M8 18.5h.01" }),
				/* @__PURE__ */ jsx("path", { d: "M16 18.5h.01" }),
				/* @__PURE__ */ jsx("path", { d: "M9 10V7h6v3" })
			]
		});
		case "quotes": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M7 7h10" }),
				/* @__PURE__ */ jsx("path", { d: "M7 12h8" }),
				/* @__PURE__ */ jsx("path", { d: "M7 17h5" }),
				/* @__PURE__ */ jsx("path", { d: "M5 3h14v18H5z" })
			]
		});
		case "offers": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M20 12l-8 8-8-8 8-8z" }),
				/* @__PURE__ */ jsx("path", { d: "M12 8v8" }),
				/* @__PURE__ */ jsx("path", { d: "M8 12h8" })
			]
		});
		case "leads": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M10 12a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7" }),
				/* @__PURE__ */ jsx("path", { d: "M3 20a7 7 0 0 1 11.3-5.5" }),
				/* @__PURE__ */ jsx("path", { d: "M18 14v6" }),
				/* @__PURE__ */ jsx("path", { d: "M15 17h6" })
			]
		});
		case "documents": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M7 3h7l4 4v14H7z" }),
				/* @__PURE__ */ jsx("path", { d: "M14 3v5h5" }),
				/* @__PURE__ */ jsx("path", { d: "M10 13h6" }),
				/* @__PURE__ */ jsx("path", { d: "M10 17h4" })
			]
		});
		case "messages": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [
				/* @__PURE__ */ jsx("path", { d: "M4 5h16v11H8l-4 4z" }),
				/* @__PURE__ */ jsx("path", { d: "M8 9h8" }),
				/* @__PURE__ */ jsx("path", { d: "M8 13h5" })
			]
		});
		case "notifications": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [/* @__PURE__ */ jsx("path", { d: "M18 9a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9" }), /* @__PURE__ */ jsx("path", { d: "M10 21h4" })]
		});
		case "profile": return /* @__PURE__ */ jsxs("svg", {
			...common,
			children: [/* @__PURE__ */ jsx("path", { d: "M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8" }), /* @__PURE__ */ jsx("path", { d: "M4 21a8 8 0 0 1 16 0" })]
		});
	}
}
//#endregion
//#region resources/js/Components/portal-topbar.tsx
function PortalTopbar({ portal, title, subtitle, onLogout }) {
	const { auth } = usePage().props;
	const userName = auth.user?.name ?? portal.profileName ?? portal.roleLabel;
	const userInitial = userName.charAt(0).toUpperCase();
	const profileHref = `/${portal.userType}/profile`;
	return /* @__PURE__ */ jsx("header", {
		className: "sticky top-0 z-30 border-b border-[#dad5cb] bg-white/95 backdrop-blur-sm",
		children: /* @__PURE__ */ jsxs("div", {
			className: "flex min-h-[72px] items-center justify-between gap-4 px-5 py-3 sm:px-7 lg:px-8",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("h1", {
					className: "truncate font-heading text-2xl font-bold uppercase leading-none tracking-[0.08em] text-neutral-950 sm:text-[1.75rem]",
					children: title
				}), subtitle && /* @__PURE__ */ jsx("p", {
					className: "mt-1 truncate text-sm text-neutral-500",
					children: subtitle
				})]
			}), /* @__PURE__ */ jsxs("div", {
				className: "flex shrink-0 items-center gap-2 sm:gap-3 lg:hidden",
				children: [/* @__PURE__ */ jsxs(Link, {
					href: profileHref,
					className: "focus-copper button-press group flex items-center gap-2.5 rounded-full border border-[#dad5cb] bg-white py-1 pl-1 pr-2 transition-colors hover:border-[#a56437] sm:pr-3",
					children: [/* @__PURE__ */ jsx("span", {
						className: "flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#a56437] font-heading text-sm font-semibold uppercase text-white",
						children: userInitial
					}), /* @__PURE__ */ jsxs("span", {
						className: "hidden min-w-0 sm:block",
						children: [/* @__PURE__ */ jsx("span", {
							className: "block max-w-[10rem] truncate text-sm font-semibold text-neutral-900",
							children: userName
						}), /* @__PURE__ */ jsx("span", {
							className: "block font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-400",
							children: portal.roleLabel
						})]
					})]
				}), /* @__PURE__ */ jsx("button", {
					type: "button",
					onClick: onLogout,
					className: "button-press focus-copper inline-flex h-10 w-fit items-center justify-center rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white sm:px-6",
					children: "Log out"
				})]
			})]
		})
	});
}
//#endregion
//#region resources/js/Components/portal-shell.tsx
var SIDEBAR_COLLAPSED_KEY = "petra-portal-sidebar-collapsed";
var UNREAD_POLL_MS = 45e3;
function PortalShell({ portal, title, eyebrow, children }) {
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
	const [collapsed, setCollapsed] = useState(false);
	useEffect(() => {
		setCollapsed(window.localStorage.getItem(SIDEBAR_COLLAPSED_KEY) === "1");
	}, []);
	/**
	* Keep the Messages nav badge current on every portal screen.
	*
	* A partial reload of the single shared `unreadMessageThreads` prop, so the poll
	* costs one indexed count and never re-serializes the page the user is reading —
	* important because a mutation on this codebase otherwise re-sends all props.
	*
	* Paused while the tab is hidden, and fired once on becoming visible so a user
	* returning to a backgrounded tab sees a current count immediately rather than
	* waiting out the remainder of an interval.
	*/
	useEffect(() => {
		function refreshUnread() {
			if (document.hidden) return;
			router.reload({ only: ["unreadMessageThreads"] });
		}
		const timer = window.setInterval(refreshUnread, UNREAD_POLL_MS);
		document.addEventListener("visibilitychange", refreshUnread);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", refreshUnread);
		};
	}, []);
	function toggleCollapsed() {
		setCollapsed((value) => {
			const next = !value;
			window.localStorage.setItem(SIDEBAR_COLLAPSED_KEY, next ? "1" : "0");
			return next;
		});
	}
	function logout() {
		setLogoutDialogOpen(false);
		router.post("/logout", {}, { replace: true });
	}
	return /* @__PURE__ */ jsxs("main", {
		className: `portal-shell min-h-screen bg-[#f3f1ec] text-neutral-950 lg:grid ${collapsed ? "lg:grid-cols-[80px_minmax(0,1fr)]" : "lg:grid-cols-[296px_minmax(0,1fr)]"}`,
		children: [
			/* @__PURE__ */ jsx(PortalSidebar, {
				portal,
				collapsed,
				onToggleCollapsed: toggleCollapsed,
				onLogout: () => setLogoutDialogOpen(true)
			}),
			/* @__PURE__ */ jsxs("section", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx(PortalTopbar, {
					portal,
					title,
					subtitle: eyebrow,
					onLogout: () => setLogoutDialogOpen(true)
				}), /* @__PURE__ */ jsx("div", {
					className: "px-5 py-6 sm:px-8 lg:px-10 lg:py-8",
					children
				})]
			}),
			/* @__PURE__ */ jsx(ConfirmDialog, {
				open: logoutDialogOpen,
				title: "Log out?",
				description: "You will be signed out of your Petra portal session and returned to the login page.",
				confirmLabel: "Log out",
				onCancel: () => setLogoutDialogOpen(false),
				onConfirm: logout
			})
		]
	});
}
//#endregion
//#region resources/js/Components/status-badge.tsx
/**
* Tone-driven status pill.
*
* Lifted verbatim from the copy in Pages/Portal/SellerOffers so the messaging
* screens render statuses identically to the rest of the portal. Near-identical
* private copies also live in BuyerQuotes and broker-queue; those are left alone
* rather than refactored as a side effect of the messaging work, but this is the
* one to consolidate on if they are ever unified.
*/
var toneClasses$3 = {
	neutral: "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700",
	success: "border-emerald-800/25 bg-emerald-50 text-emerald-800",
	warning: "border-amber-800/25 bg-amber-50 text-amber-800",
	muted: "border-neutral-300 bg-neutral-100 text-neutral-500",
	danger: "border-[#b3261e]/25 bg-red-50 text-[#b3261e]"
};
function StatusBadge$5({ label, tone = "neutral" }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses$3[tone] ?? toneClasses$3.neutral}`,
		children: label
	});
}
//#endregion
//#region resources/js/Components/thread-list.tsx
function formatTimestamp(iso) {
	if (!iso) return "";
	const date = new Date(iso);
	const now = /* @__PURE__ */ new Date();
	if (date.toDateString() === now.toDateString()) return date.toLocaleTimeString(void 0, {
		hour: "numeric",
		minute: "2-digit"
	});
	if (date.getFullYear() === now.getFullYear()) return date.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric"
	});
	return date.toLocaleDateString(void 0, {
		month: "short",
		day: "numeric",
		year: "numeric"
	});
}
function Chip$1({ children, muted = false }) {
	return /* @__PURE__ */ jsx("span", {
		className: `max-w-full truncate rounded-full px-2 py-0.5 font-heading text-[0.6rem] font-semibold uppercase tracking-[0.08em] ${muted ? "bg-neutral-100 text-neutral-400" : "bg-[#f3f1ec] text-neutral-500"}`,
		children
	});
}
function ThreadList({ threads, activeId, showParticipant = false, emptyLabel }) {
	if (threads.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "rounded-xl border border-dashed border-[#dad5cb] bg-white p-6 text-sm leading-6 text-neutral-500",
		children: emptyLabel ?? "No conversations."
	});
	return /* @__PURE__ */ jsx("ul", {
		className: "grid max-h-[calc(100dvh-15rem)] min-w-0 gap-1 overflow-y-auto overflow-x-hidden rounded-xl border border-[#dad5cb] bg-white p-2 shadow-sm",
		children: threads.map((thread) => {
			const active = thread.id === activeId;
			const unread = thread.unreadCount > 0;
			return /* @__PURE__ */ jsx("li", {
				className: "min-w-0",
				children: /* @__PURE__ */ jsxs(Link, {
					href: thread.url,
					"aria-current": active ? "true" : void 0,
					className: `grid min-w-0 gap-1 overflow-hidden rounded-lg border p-3 transition-colors ${active ? "border-[#a56437]/40 bg-[#f4ece4]" : "border-transparent hover:border-[#dad5cb] hover:bg-[#f9f7f3]"}`,
					children: [
						/* @__PURE__ */ jsxs("span", {
							className: "flex min-w-0 items-start justify-between gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: `min-w-0 truncate text-sm ${unread ? "font-semibold text-neutral-950" : "font-medium text-neutral-800"}`,
								children: thread.subjectTitle
							}), /* @__PURE__ */ jsx("span", {
								className: "shrink-0 text-[0.7rem] text-neutral-400",
								children: formatTimestamp(thread.lastMessageAt)
							})]
						}),
						showParticipant && thread.userName && /* @__PURE__ */ jsxs("span", {
							className: "min-w-0 truncate font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500",
							children: [
								thread.userName,
								" · ",
								thread.userRole
							]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex min-w-0 items-center justify-between gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: `min-w-0 truncate text-xs ${unread ? "text-neutral-700" : "text-neutral-500"}`,
								children: thread.snippet
							}), unread && /* @__PURE__ */ jsx("span", {
								className: "flex h-5 min-w-5 shrink-0 items-center justify-center rounded-full bg-[#a56437] px-1.5 text-[0.65rem] font-semibold leading-none text-white",
								"aria-label": `${thread.unreadCount} unread`,
								children: thread.unreadCount > 99 ? "99+" : thread.unreadCount
							})]
						}),
						/* @__PURE__ */ jsxs("span", {
							className: "flex min-w-0 flex-wrap items-center gap-1",
							children: [
								/* @__PURE__ */ jsx(Chip$1, { children: thread.subjectTypeLabel }),
								thread.subjectStatus && /* @__PURE__ */ jsx(Chip$1, { children: thread.subjectStatus.label }),
								thread.isClosed && /* @__PURE__ */ jsx(Chip$1, {
									muted: true,
									children: "Closed"
								})
							]
						})
					]
				})
			}, thread.id);
		})
	});
}
//#endregion
//#region resources/js/Pages/Broker/Inbox.tsx
var Inbox_exports = /* @__PURE__ */ __exportAll({ default: () => Inbox });
var THREAD_POLL_MS$1 = 2e4;
/**
* The broker inbox: every customer conversation, unread first.
*
* Same three-part shape as the customer Messages screen (list / transcript /
* composer) plus the two things only a broker needs: a context panel on the linked
* subject, and canned responses.
*/
function Inbox({ portal, threads, thread, messages, context, cannedResponses, filters, filterOptions }) {
	const { status } = usePage().props;
	const [closeDialogOpen, setCloseDialogOpen] = useState(false);
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	const threadId = thread?.id ?? null;
	useEffect(() => {
		if (threadId === null) return;
		function refresh() {
			if (document.hidden) return;
			router.reload({
				only: [
					"thread",
					"messages",
					"threads",
					"unreadMessageThreads"
				],
				onCancelToken: (token) => registerPollCancel(token.cancel),
				onFinish: () => registerPollCancel(null)
			});
		}
		const timer = window.setInterval(refresh, THREAD_POLL_MS$1);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [threadId]);
	const markRead = useCallback(() => {
		if (threadId === null) return;
		router.post(`/broker/inbox/${threadId}/read`, {}, {
			preserveScroll: true,
			preserveState: true,
			only: ["threads", "unreadMessageThreads"]
		});
	}, [threadId]);
	function applyFilter(next) {
		const query = {};
		const unreadOnly = next.unread_only ?? filters.unreadOnly;
		const subjectType = next.subject_type ?? filters.subjectType ?? "";
		const listingStatus = next.listing_status ?? filters.listingStatus ?? "";
		if (unreadOnly) query.unread_only = "1";
		if (subjectType) query.subject_type = subjectType;
		if (listingStatus) query.listing_status = listingStatus;
		router.get(threadId ? `/broker/inbox/${threadId}` : "/broker/inbox", query, {
			preserveState: true,
			preserveScroll: true
		});
	}
	function setThreadStatus(nextStatus) {
		setCloseDialogOpen(false);
		if (threadId === null) return;
		router.patch(`/broker/inbox/${threadId}/status`, { status: nextStatus }, { preserveScroll: true });
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [
		/* @__PURE__ */ jsx(Head, { title: "Inbox | Broker Portal" }),
		/* @__PURE__ */ jsx(PortalShell, {
			portal,
			title: "Inbox",
			children: /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
				children: [
					/* @__PURE__ */ jsx(PortalPageHeader, {
						eyebrow: "Conversations",
						title: "Inbox",
						description: "Every buyer and seller conversation, unread first."
					}),
					/* @__PURE__ */ jsx(InboxFilters, {
						filters,
						options: filterOptions,
						onChange: applyFilter
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "grid gap-4 lg:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]",
						children: [/* @__PURE__ */ jsx("div", {
							className: `min-w-0 ${thread ? "hidden lg:block" : "block"}`,
							children: /* @__PURE__ */ jsx(ThreadList, {
								threads,
								activeId: threadId,
								showParticipant: true,
								emptyLabel: filters.unreadOnly || filters.subjectType || filters.listingStatus ? "No conversations match these filters." : "No conversations yet."
							})
						}), thread && messages ? /* @__PURE__ */ jsxs("section", {
							className: "grid gap-4 xl:grid-cols-[minmax(0,1fr)_minmax(0,20rem)]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "flex min-h-[26rem] flex-col overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f9f7f3] shadow-sm lg:h-[calc(100dvh-15rem)]",
								children: [
									/* @__PURE__ */ jsxs("header", {
										className: "grid gap-0.5 border-b border-[#ece7dd] bg-white px-4 py-2.5 sm:px-5",
										children: [
											/* @__PURE__ */ jsx(Link, {
												href: "/broker/inbox",
												className: "focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline lg:hidden",
												children: "← All conversations"
											}),
											/* @__PURE__ */ jsxs("div", {
												className: "flex flex-wrap items-center justify-between gap-2",
												children: [/* @__PURE__ */ jsxs("div", {
													className: "flex flex-wrap items-center gap-2",
													children: [/* @__PURE__ */ jsx("h2", {
														className: "font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950",
														children: thread.subjectTitle
													}), thread.isClosed && /* @__PURE__ */ jsx(StatusBadge$5, {
														label: "Closed",
														tone: "muted"
													})]
												}), thread.isClosed ? /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setThreadStatus("open"),
													className: "focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline",
													children: "Reopen"
												}) : /* @__PURE__ */ jsx("button", {
													type: "button",
													onClick: () => setCloseDialogOpen(true),
													className: "focus-copper font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500 underline-offset-4 hover:text-[#a56437] hover:underline",
													children: "Close thread"
												})]
											}),
											/* @__PURE__ */ jsxs("p", {
												className: "text-sm text-neutral-500",
												children: [
													thread.userName,
													" · ",
													thread.userRole
												]
											})
										]
									}),
									/* @__PURE__ */ jsx(MessageThread, {
										page: messages,
										onNewMessages: markRead
									}),
									/* @__PURE__ */ jsx(MessageComposer, {
										action: `/broker/inbox/${thread.id}/messages`,
										placeholder: "Reply as Petra…",
										toolbar: (insert) => /* @__PURE__ */ jsx(CannedResponses, {
											responses: cannedResponses,
											onInsert: insert
										})
									})
								]
							}), context && /* @__PURE__ */ jsx(ContextPanel, { context })]
						}) : /* @__PURE__ */ jsx("section", {
							className: "hidden items-center justify-center rounded-xl border border-dashed border-[#dad5cb] bg-white p-10 text-center text-sm text-neutral-500 lg:flex",
							children: "Select a conversation to read it."
						})]
					})
				]
			})
		}),
		/* @__PURE__ */ jsx(ConfirmDialog, {
			open: closeDialogOpen,
			title: "Close this thread?",
			description: "The customer keeps full access and any new message reopens it automatically.",
			confirmLabel: "Close thread",
			onCancel: () => setCloseDialogOpen(false),
			onConfirm: () => setThreadStatus("closed")
		})
	] });
}
function InboxFilters({ filters, options, onChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-wrap items-center gap-3 rounded-xl border border-[#dad5cb] bg-white p-3 shadow-sm",
		children: [
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2 text-sm font-medium text-neutral-700",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: filters.unreadOnly,
					onChange: (event) => onChange({ unread_only: event.target.checked }),
					className: "h-4 w-4 rounded border-[#dad5cb] text-[#a56437] focus:ring-[#a56437]/40"
				}), "Unread only"]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2 text-sm text-neutral-700",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500",
					children: "Subject"
				}), /* @__PURE__ */ jsxs("select", {
					value: filters.subjectType ?? "",
					onChange: (event) => onChange({ subject_type: event.target.value }),
					className: "focus-copper rounded-lg border border-[#dad5cb] bg-white px-2 py-1.5 text-sm",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "All"
					}), Object.entries(options.subjectTypes).map(([value, label]) => /* @__PURE__ */ jsx("option", {
						value,
						children: label
					}, value))]
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2 text-sm text-neutral-700",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-neutral-500",
					children: "Listing status"
				}), /* @__PURE__ */ jsxs("select", {
					value: filters.listingStatus ?? "",
					onChange: (event) => onChange({ listing_status: event.target.value }),
					className: "focus-copper rounded-lg border border-[#dad5cb] bg-white px-2 py-1.5 text-sm",
					children: [/* @__PURE__ */ jsx("option", {
						value: "",
						children: "Any"
					}), Object.entries(options.listingStatuses).map(([value, label]) => /* @__PURE__ */ jsx("option", {
						value,
						children: label
					}, value))]
				})]
			})
		]
	});
}
/**
* Canned responses insert at the caret rather than replacing the draft, so a broker
* can top-and-tail a snippet instead of losing what they had already typed.
*/
function CannedResponses({ responses, onInsert }) {
	if (responses.length === 0) return null;
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
		className: "flex shrink-0 items-center font-heading text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-neutral-400",
		children: "Quick replies"
	}), responses.map((response) => /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => onInsert(response.body),
		title: response.body,
		className: "button-press focus-copper shrink-0 whitespace-nowrap rounded-full border border-[#dad5cb] bg-white px-2.5 py-1 text-xs font-medium text-neutral-700 transition-colors hover:border-[#a56437] hover:text-[#8a5330]",
		children: response.title
	}, response.id))] });
}
function ContextPanel({ context }) {
	const isListing = context.kind === "listing";
	return /* @__PURE__ */ jsxs("aside", {
		className: "grid h-fit gap-3 rounded-xl border border-[#dad5cb] bg-white p-4 shadow-sm",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-2",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-[0.65rem] font-semibold uppercase tracking-[0.12em] text-neutral-400",
						children: isListing ? "Linked listing" : "Buyer request"
					}),
					/* @__PURE__ */ jsx("h3", {
						className: "font-heading text-base font-semibold uppercase tracking-[0.04em] text-neutral-950",
						children: context.title
					}),
					/* @__PURE__ */ jsx(StatusBadge$5, {
						label: context.statusLabel,
						tone: context.statusTone
					})
				]
			}),
			isListing && context.photos && context.photos.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-2 gap-2",
				children: context.photos.slice(0, 4).map((photo) => /* @__PURE__ */ jsx("img", {
					src: photo.url,
					alt: photo.name,
					loading: "lazy",
					className: "aspect-[4/3] w-full rounded-lg object-cover"
				}, photo.url))
			}),
			/* @__PURE__ */ jsx("dl", {
				className: "grid gap-2 text-sm",
				children: isListing ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Listing ID",
						value: context.publicId ?? "Not published"
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Category",
						value: context.category
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Region",
						value: context.region
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Condition",
						value: context.condition
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Condition notes",
						value: context.conditionNotes
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Asking price",
						value: context.needsValuation ? "Valuation requested" : context.askingPrice
					})
				] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Specifications",
						value: context.specifications
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Budget",
						value: context.budget
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Timeline",
						value: context.timeline
					}),
					/* @__PURE__ */ jsx(ContextRow, {
						label: "Location",
						value: context.locationPreference
					})
				] })
			}),
			context.href && /* @__PURE__ */ jsx(Link, {
				href: context.href,
				className: "focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline",
				children: "Open full record"
			})
		]
	});
}
function ContextRow({ label, value }) {
	if (!value) return null;
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-0.5",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "font-heading text-[0.6rem] font-semibold uppercase tracking-[0.1em] text-neutral-400",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "text-sm leading-6 text-neutral-800",
			children: value
		})]
	});
}
//#endregion
//#region resources/js/Components/slide-over.tsx
/**
* Right-hand slide-over panel, built on Radix Dialog.
*
* This was hand-rolled: a rAF/setTimeout pair drove the transition, and it handled
* Escape and body-scroll locking itself. It did NOT trap focus — Tab walked straight out
* of the panel into the page behind it — nor restore focus to the trigger on close, nor
* hide the background from screen readers. Radix supplies all three, plus a Presence
* layer that keeps the node mounted through the exit animation, which is what makes
* closing animate rather than snap.
*
* The props are unchanged from the hand-rolled version so call sites did not move; the
* animation lives in app.css keyed off Radix's data-state attributes.
*/
function SlideOver({ children, eyebrow, open, title, onClose }) {
	return /* @__PURE__ */ jsx(Dialog.Root, {
		open,
		onOpenChange: (next) => {
			if (!next) onClose();
		},
		children: /* @__PURE__ */ jsxs(Dialog.Portal, { children: [/* @__PURE__ */ jsx(Dialog.Overlay, { className: "slide-over-overlay fixed inset-0 z-[80] bg-neutral-950/40" }), /* @__PURE__ */ jsxs(Dialog.Content, {
			"aria-describedby": void 0,
			className: "portal-shell slide-over-panel fixed right-0 top-0 z-[80] grid h-dvh w-full max-w-none content-start overflow-y-auto overscroll-contain border-[#dad5cb] bg-[#f8f8f6] shadow-2xl focus:outline-none sm:max-w-2xl sm:border-l",
			children: [/* @__PURE__ */ jsxs("header", {
				className: "sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-[#dad5cb] bg-white px-5 py-5 sm:px-7",
				children: [/* @__PURE__ */ jsxs("div", { children: [eyebrow && /* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
					children: eyebrow
				}), /* @__PURE__ */ jsx(Dialog.Title, {
					className: "mt-2 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: title
				})] }), /* @__PURE__ */ jsx(Dialog.Close, {
					"aria-label": "Close panel",
					className: "button-press focus-copper inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#dad5cb] text-neutral-500 transition-colors hover:border-[#a56437] hover:bg-[#f3f1ec] hover:text-neutral-900",
					children: /* @__PURE__ */ jsx(CloseIcon$2, {})
				})]
			}), /* @__PURE__ */ jsx("div", {
				className: "px-5 py-6 sm:px-7",
				children
			})]
		})] })
	});
}
function CloseIcon$2() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M6 6l12 12" }), /* @__PURE__ */ jsx("path", { d: "M18 6L6 18" })]
	});
}
//#endregion
//#region resources/js/Components/pagination.tsx
/**
* Client-side pagination controls: a range readout, an optional page-size selector, and
* a page-number nav that collapses to ellipses past seven pages.
*
* Extracted from My Listings, which had the only implementation in the codebase. Nothing
* is paginated server-side — every controller returns its full collection — so this
* slices an in-memory array. That is fine at current volumes but will not hold if a
* broker queue grows into the thousands; at that point this becomes the seam to swap for
* a real paginated endpoint.
*/
var PAGE_SIZE_OPTIONS = [
	10,
	20,
	50
];
function pageWindow(current, total) {
	if (total <= 7) return Array.from({ length: total }, (_, index) => index + 1);
	const shown = [...new Set([
		1,
		total,
		current - 1,
		current,
		current + 1
	])].filter((value) => value >= 1 && value <= total).sort((a, b) => a - b);
	const result = [];
	let previous = 0;
	for (const value of shown) {
		if (value - previous > 1) result.push("ellipsis");
		result.push(value);
		previous = value;
	}
	return result;
}
function Pagination({ page, totalPages, rangeStart, rangeEnd, total, onChange, pageSize, onPageSizeChange }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex flex-col items-center justify-between gap-3 sm:flex-row",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center gap-3",
			children: [/* @__PURE__ */ jsxs("p", {
				className: "text-sm text-neutral-500",
				children: [
					"Showing ",
					rangeStart,
					"–",
					rangeEnd,
					" of ",
					total
				]
			}), pageSize !== void 0 && onPageSizeChange && /* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
					children: "Per page"
				}), /* @__PURE__ */ jsx("select", {
					value: pageSize,
					onChange: (event) => onPageSizeChange(Number(event.target.value)),
					className: "polished-select h-9 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-8 font-heading text-sm font-semibold text-neutral-800",
					children: PAGE_SIZE_OPTIONS.map((size) => /* @__PURE__ */ jsx("option", {
						value: size,
						children: size
					}, size))
				})]
			})]
		}), totalPages > 1 && /* @__PURE__ */ jsxs("nav", {
			"aria-label": "Pagination",
			className: "flex items-center gap-1.5",
			children: [
				/* @__PURE__ */ jsx(PageButton, {
					label: "Previous page",
					disabled: page <= 1,
					onClick: () => onChange(page - 1),
					children: /* @__PURE__ */ jsx(ChevronIcon, { dir: "left" })
				}),
				pageWindow(page, totalPages).map((entry, index) => entry === "ellipsis" ? /* @__PURE__ */ jsx("span", {
					className: "px-1 text-neutral-400",
					children: "…"
				}, `ellipsis-${index}`) : /* @__PURE__ */ jsx(PageButton, {
					active: entry === page,
					onClick: () => onChange(entry),
					children: entry
				}, entry)),
				/* @__PURE__ */ jsx(PageButton, {
					label: "Next page",
					disabled: page >= totalPages,
					onClick: () => onChange(page + 1),
					children: /* @__PURE__ */ jsx(ChevronIcon, { dir: "right" })
				})
			]
		})]
	});
}
function PageButton({ children, onClick, active = false, disabled = false, label }) {
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick,
		disabled,
		"aria-label": label,
		"aria-current": active ? "page" : void 0,
		className: `focus-copper flex h-9 min-w-9 items-center justify-center rounded-lg border px-2.5 font-heading text-sm font-semibold transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${active ? "border-[#a56437] bg-[#a56437] text-white" : "border-[#dad5cb] bg-white text-neutral-700 hover:border-[#a56437] hover:text-[#a56437]"}`,
		children
	});
}
function ChevronIcon({ dir }) {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: dir === "left" ? /* @__PURE__ */ jsx("path", { d: "M15 6l-6 6 6 6" }) : /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" })
	});
}
//#endregion
//#region resources/js/Components/data-table.tsx
var HIDE_BELOW_CLASS = {
	sm: "hidden sm:table-cell",
	md: "hidden md:table-cell",
	lg: "hidden lg:table-cell",
	xl: "hidden xl:table-cell"
};
function DataTable({ columns, rows, rowKey, onRowClick, rowLabel, caption, paginated = true }) {
	const interactive = Boolean(onRowClick);
	const [page, setPage] = useState(1);
	const [pageSize, setPageSize] = useState(10);
	const showPagination = paginated && rows.length > 10;
	const totalPages = showPagination ? Math.max(1, Math.ceil(rows.length / pageSize)) : 1;
	const currentPage = Math.min(page, totalPages);
	const visibleRows = useMemo(() => showPagination ? rows.slice((currentPage - 1) * pageSize, currentPage * pageSize) : rows, [
		rows,
		showPagination,
		currentPage,
		pageSize
	]);
	useEffect(() => {
		setPage(1);
	}, [rows.length]);
	const rangeStart = rows.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const rangeEnd = Math.min(currentPage * pageSize, rows.length);
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ jsx("div", {
			className: "overflow-x-auto rounded-xl border border-[#dad5cb] bg-white shadow-sm",
			children: /* @__PURE__ */ jsxs("table", {
				className: "w-full min-w-[38rem] border-collapse text-left",
				children: [
					caption && /* @__PURE__ */ jsx("caption", {
						className: "sr-only",
						children: caption
					}),
					/* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", {
						className: "border-b border-[#dad5cb] bg-[#faf8f5]",
						children: [columns.map((column) => /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: [
								"px-4 py-3 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.16em] text-neutral-500",
								column.align === "right" ? "text-right" : "text-left",
								column.width ?? "",
								column.hideBelow ? HIDE_BELOW_CLASS[column.hideBelow] : ""
							].filter(Boolean).join(" "),
							children: column.header
						}, column.key)), interactive && /* @__PURE__ */ jsx("th", {
							scope: "col",
							className: "w-12 px-4 py-3",
							children: /* @__PURE__ */ jsx("span", {
								className: "sr-only",
								children: "Actions"
							})
						})]
					}) }),
					/* @__PURE__ */ jsx("tbody", { children: visibleRows.map((item) => /* @__PURE__ */ jsxs("tr", {
						onClick: onRowClick ? () => onRowClick(item) : void 0,
						className: `border-b border-[#ece7dd] last:border-b-0 ${interactive ? "cursor-pointer transition-colors hover:bg-[#faf8f5]" : ""}`,
						children: [columns.map((column) => /* @__PURE__ */ jsx("td", {
							className: [
								"px-4 py-3 align-middle text-sm text-neutral-600",
								column.align === "right" ? "text-right" : "text-left",
								column.hideBelow ? HIDE_BELOW_CLASS[column.hideBelow] : ""
							].filter(Boolean).join(" "),
							children: column.cell(item)
						}, column.key)), onRowClick && /* @__PURE__ */ jsx("td", {
							className: "px-4 py-3 text-right align-middle",
							children: /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: (event) => {
									event.stopPropagation();
									onRowClick(item);
								},
								"aria-label": rowLabel ? rowLabel(item) : "Open row",
								className: "focus-copper inline-flex h-8 w-8 items-center justify-center rounded-lg text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-900",
								children: /* @__PURE__ */ jsx(ChevronRight, {})
							})
						})]
					}, rowKey(item))) })
				]
			})
		}), showPagination && /* @__PURE__ */ jsx(Pagination, {
			page: currentPage,
			totalPages,
			rangeStart,
			rangeEnd,
			total: rows.length,
			onChange: setPage,
			pageSize,
			onPageSizeChange: (size) => {
				setPageSize(size);
				setPage(1);
			}
		})]
	});
}
function ChevronRight() {
	return /* @__PURE__ */ jsx("svg", {
		className: "h-5 w-5 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: /* @__PURE__ */ jsx("path", { d: "M9 6l6 6-6 6" })
	});
}
/**
* Stacked primary/secondary text for a table's identifying column — a title with its
* supporting line, without every caller re-inventing the type scale.
*/
function CellStack({ primary, secondary }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "min-w-0",
		children: [/* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap items-center gap-x-2 gap-y-1",
			children: primary
		}), secondary && /* @__PURE__ */ jsx("p", {
			className: "mt-0.5 truncate text-xs leading-5 text-neutral-500",
			children: secondary
		})]
	});
}
//#endregion
//#region resources/js/Components/broker-queue.tsx
function sortByDate(items, direction) {
	return [...items].sort((first, second) => {
		const firstTimestamp = first.created_at_timestamp ?? 0;
		const secondTimestamp = second.created_at_timestamp ?? 0;
		return direction === "desc" ? secondTimestamp - firstTimestamp : firstTimestamp - secondTimestamp;
	});
}
function searchItems(items, search, fields) {
	const term = search.trim().toLowerCase();
	if (!term) return items;
	return items.filter((item) => fields(item).filter(Boolean).join(" ").toLowerCase().includes(term));
}
function buildStatusChips(items, options) {
	const counts = {};
	items.forEach((item) => {
		counts[item.status] = (counts[item.status] ?? 0) + 1;
	});
	const chips = [{
		value: "all",
		label: "All",
		count: items.length
	}];
	Object.entries(options).forEach(([value, label]) => {
		if (counts[value]) chips.push({
			value,
			label,
			count: counts[value]
		});
	});
	return chips;
}
/**
* Search + status-chip + sort state for one queue. Searching resets the status filter,
* since the chip counts are derived from the search results and a stale filter would
* otherwise hide everything the new search found.
*/
function useQueue(items, statusOptions, fields) {
	const [search, setSearch] = useState("");
	const [statusFilter, setStatusFilter] = useState("all");
	const [sort, setSort] = useState("desc");
	const fieldsRef = useRef(fields);
	fieldsRef.current = fields;
	const searched = useMemo(() => searchItems(items, search, (item) => fieldsRef.current(item)), [items, search]);
	const chips = useMemo(() => buildStatusChips(searched, statusOptions), [searched, statusOptions]);
	const visible = useMemo(() => sortByDate(searched.filter((item) => statusFilter === "all" || item.status === statusFilter), sort), [
		searched,
		statusFilter,
		sort
	]);
	function onSearch(value) {
		setSearch(value);
		setStatusFilter("all");
	}
	function clear() {
		setSearch("");
		setStatusFilter("all");
	}
	return {
		search,
		onSearch,
		chips,
		statusFilter,
		setStatusFilter,
		sort,
		setSort,
		visible,
		clear
	};
}
function formatUSD$2(value) {
	const amount = Number(value);
	return Number.isNaN(amount) ? value : amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
}
function todayIso() {
	const now = /* @__PURE__ */ new Date();
	const offset = now.getTimezoneOffset() * 6e4;
	return new Date(now.getTime() - offset).toISOString().slice(0, 10);
}
function summaryPrice(submission) {
	if (submission.needs_valuation) return "Valuation requested";
	return submission.asking_price ? formatUSD$2(submission.asking_price) : "No price set";
}
function QueueToolbar({ search, onSearch, chips, activeStatus, onStatus, sort, onSort, placeholder = "Search by title, name, or email" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "relative sm:w-80",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400",
						children: /* @__PURE__ */ jsx(SearchIcon$1, {})
					}),
					/* @__PURE__ */ jsx("input", {
						type: "search",
						value: search,
						onChange: (event) => onSearch(event.target.value),
						placeholder,
						"aria-label": "Search",
						className: "h-11 w-full rounded-lg border border-[#dad5cb] bg-white pl-10 pr-9 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#a56437] focus:ring-2 focus:ring-[#a56437]/15 [&::-webkit-search-cancel-button]:appearance-none"
					}),
					search && /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onSearch(""),
						"aria-label": "Clear search",
						className: "focus-copper absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-700",
						children: /* @__PURE__ */ jsx(CloseIcon$1, {})
					})
				]
			}), /* @__PURE__ */ jsxs("label", {
				className: "flex items-center gap-2",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
					children: "Sort"
				}), /* @__PURE__ */ jsxs("select", {
					value: sort,
					onChange: (event) => onSort(event.target.value),
					className: "polished-select h-11 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800",
					children: [/* @__PURE__ */ jsx("option", {
						value: "desc",
						children: "Newest first"
					}), /* @__PURE__ */ jsx("option", {
						value: "asc",
						children: "Oldest first"
					})]
				})]
			})]
		}), /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2",
			children: chips.map((chip) => /* @__PURE__ */ jsx(Chip, {
				active: chip.value === activeStatus,
				count: chip.count,
				onClick: () => onStatus(chip.value),
				children: chip.label
			}, chip.value))
		})]
	});
}
function Chip({ active, count, onClick, children }) {
	return /* @__PURE__ */ jsxs("button", {
		type: "button",
		onClick,
		"aria-pressed": active,
		className: `focus-copper inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 font-heading text-xs font-semibold uppercase tracking-[0.08em] transition-colors ${active ? "border-[#a56437] bg-[#a56437] text-white" : "border-[#dad5cb] bg-white text-neutral-600 hover:border-[#a56437] hover:text-[#a56437]"}`,
		children: [children, /* @__PURE__ */ jsx("span", {
			className: `rounded-full px-1.5 text-[0.65rem] ${active ? "bg-white/20 text-white" : "bg-neutral-100 text-neutral-500"}`,
			children: count
		})]
	});
}
function NoResults$1({ onClear }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm",
		children: [/* @__PURE__ */ jsx("p", {
			className: "text-base leading-7 text-neutral-600",
			children: "No items match your search or filter."
		}), /* @__PURE__ */ jsx("button", {
			type: "button",
			onClick: onClear,
			className: "button-press focus-copper mt-4 inline-flex h-10 items-center justify-center rounded-lg border border-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white",
			children: "Clear filters"
		})]
	});
}
function SearchIcon$1() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-5 w-5 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "11",
			cy: "11",
			r: "7"
		}), /* @__PURE__ */ jsx("path", { d: "M20 20l-3.5-3.5" })]
	});
}
function CloseIcon$1() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M6 6l12 12" }), /* @__PURE__ */ jsx("path", { d: "M18 6L6 18" })]
	});
}
function StatusForm({ value, options, action, label = "Save" }) {
	const form = useForm({ status: value });
	function submit(event) {
		event.preventDefault();
		form.patch(action, {
			preserveScroll: true,
			onSuccess: () => form.setDefaults()
		});
	}
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		className: "flex flex-wrap items-center gap-2",
		children: [
			/* @__PURE__ */ jsx(StatusBadge$4, {
				status: form.data.status,
				label: options[form.data.status] ?? form.data.status
			}),
			/* @__PURE__ */ jsx("select", {
				value: form.data.status,
				onChange: (event) => form.setData("status", event.target.value),
				className: "polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800",
				children: Object.entries(options).map(([status, optionLabel]) => /* @__PURE__ */ jsx("option", {
					value: status,
					children: optionLabel
				}, status))
			}),
			/* @__PURE__ */ jsx("button", {
				type: "submit",
				disabled: form.processing || !form.isDirty,
				className: "button-press focus-copper h-10 rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60",
				children: label
			})
		]
	});
}
function StatusBadge$4({ status, label }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-7 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${statusBadgeClass(status)}`,
		children: label
	});
}
function statusBadgeClass(status) {
	switch (status) {
		case "under_review": return "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700";
		case "published": return "border-emerald-800/25 bg-emerald-50 text-emerald-800";
		case "pending": return "border-amber-800/25 bg-amber-50 text-amber-800";
		case "sold": return "border-neutral-300 bg-neutral-100 text-neutral-500";
		case "not_accepted": return "border-[#b3261e]/25 bg-red-50 text-[#b3261e]";
		case "checking_inventory": return "border-amber-300 bg-amber-50 text-amber-800";
		case "contacting_sellers": return "border-sky-300 bg-sky-50 text-sky-800";
		case "options_presented": return "border-indigo-300 bg-indigo-50 text-indigo-800";
		case "reviewing_options": return "border-emerald-300 bg-emerald-50 text-emerald-800";
		case "closed": return "border-neutral-300 bg-neutral-100 text-neutral-500";
		case "new": return "border-[#a56437]/30 bg-[#f4ece4] text-[#8a5330]";
		case "contacted": return "border-sky-300 bg-sky-50 text-sky-800";
		case "accepted": return "border-emerald-800/25 bg-emerald-50 text-emerald-800";
		case "declined": return "border-[#b3261e]/25 bg-red-50 text-[#b3261e]";
		case "countered": return "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700";
		default: return "border-neutral-300 bg-neutral-50 text-neutral-700";
	}
}
function Detail$3({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "mt-1 text-neutral-700",
		children: value || "Not provided"
	})] });
}
function EmptyState$1({ text }) {
	return /* @__PURE__ */ jsx("p", {
		className: "rounded-xl border border-[#dad5cb] bg-[#f8f8f6] p-5 text-base leading-7 text-neutral-600",
		children: text
	});
}
//#endregion
//#region resources/js/Pages/Broker/Leads.tsx
var Leads_exports = /* @__PURE__ */ __exportAll({ default: () => BrokerLeads });
/**
* Talk to a Broker inquiries from the public Sell Equipment section. Same shape as the two
* review queues — rows in the list, detail in a slide-over — but a lead has no record to
* publish or price, so the panel is contact details, the message, and a status to move.
*/
function BrokerLeads({ portal, leads, leadStatusOptions }) {
	const { status } = usePage().props;
	const [activeId, setActiveId] = useState(null);
	const active = leads.find((lead) => lead.id === activeId) ?? null;
	const queue = useQueue(leads, leadStatusOptions, (item) => [
		item.full_name,
		item.company,
		item.email,
		item.phone,
		item.topic_label,
		item.equipment_type,
		item.status_label
	]);
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Leads | Broker Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "Leads",
		eyebrow: `${leads.length} ${leads.length === 1 ? "inquiry" : "inquiries"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsx(QueueToolbar, {
				search: queue.search,
				onSearch: queue.onSearch,
				chips: queue.chips,
				activeStatus: queue.statusFilter,
				onStatus: queue.setStatusFilter,
				sort: queue.sort,
				onSort: queue.setSort,
				placeholder: "Search by name, company, email, or topic"
			}), leads.length === 0 ? /* @__PURE__ */ jsx(EmptyState$1, { text: "No broker inquiries have been submitted yet." }) : queue.visible.length === 0 ? /* @__PURE__ */ jsx(NoResults$1, { onClear: queue.clear }) : /* @__PURE__ */ jsx(DataTable, {
				columns: LEAD_COLUMNS,
				rows: queue.visible,
				rowKey: (lead) => lead.id,
				onRowClick: (lead) => setActiveId(lead.id),
				rowLabel: (lead) => `Review inquiry from ${lead.full_name}`,
				caption: "Talk to a Broker inquiries awaiting a response"
			})]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: "Broker inquiry",
			title: active?.full_name ?? "",
			children: active && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ jsxs("dl", {
					className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Company",
							value: active.company
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Topic",
							value: active.topic_label
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Email",
							value: active.email
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Phone",
							value: active.phone
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Prefers",
							value: active.preferred_contact_label
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Equipment type",
							value: active.equipment_type
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Submitted",
							value: active.created_at
						}),
						active.account_name && /* @__PURE__ */ jsx(Detail$3, {
							label: "Signed in as",
							value: `${active.account_name} (${active.account_email})`
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
								children: "Message"
							}), /* @__PURE__ */ jsx("dd", {
								className: "mt-1 whitespace-pre-line text-neutral-700",
								children: active.message
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "border-t border-[#dad5cb] pt-6",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
						children: "Lead status"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3",
						children: /* @__PURE__ */ jsx(StatusForm, {
							value: active.status,
							options: leadStatusOptions,
							action: `/broker/leads/${active.id}`
						}, `${active.id}:${active.status}`)
					})]
				})]
			})
		})]
	})] });
}
/** Column layout for the lead queue. Mirrors the other two queues' responsive priorities. */
var LEAD_COLUMNS = [
	{
		key: "contact",
		header: "Contact",
		cell: (lead) => /* @__PURE__ */ jsx(CellStack, {
			primary: /* @__PURE__ */ jsx("span", {
				className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
				children: lead.full_name
			}),
			secondary: lead.company ?? void 0
		})
	},
	{
		key: "topic",
		header: "Topic",
		hideBelow: "md",
		cell: (lead) => /* @__PURE__ */ jsx(CellStack, {
			primary: lead.topic_label,
			secondary: lead.equipment_type ?? void 0
		})
	},
	{
		key: "reach",
		header: "Reach them",
		hideBelow: "lg",
		cell: (lead) => /* @__PURE__ */ jsx(CellStack, {
			primary: lead.email,
			secondary: lead.phone
		})
	},
	{
		key: "prefers",
		header: "Prefers",
		hideBelow: "xl",
		cell: (lead) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: lead.preferred_contact_label
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (lead) => /* @__PURE__ */ jsx(StatusBadge$4, {
			status: lead.status,
			label: lead.status_label
		})
	}
];
//#endregion
//#region resources/js/Pages/Broker/Requests.tsx
var Requests_exports = /* @__PURE__ */ __exportAll({ default: () => BrokerRequests });
/**
* The buyer request queue. Split out of Pages/Broker/Submissions, where it was the
* second tab of a single page; it is now its own sidebar destination. Mirrors the
* seller queue's shape — rows in the list, detail in a slide-over.
*/
function BrokerRequests({ portal, buyerRequests, buyerStatusOptions }) {
	const { status } = usePage().props;
	const [activeId, setActiveId] = useState(null);
	const active = buyerRequests.find((request) => request.id === activeId) ?? null;
	const queue = useQueue(buyerRequests, buyerStatusOptions, (item) => [
		item.equipment_type,
		item.buyer,
		item.email,
		item.company_name,
		item.status_label
	]);
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Buyer Requests | Broker Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "Buyer Requests",
		eyebrow: `${buyerRequests.length} ${buyerRequests.length === 1 ? "request" : "requests"}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsx(QueueToolbar, {
				search: queue.search,
				onSearch: queue.onSearch,
				chips: queue.chips,
				activeStatus: queue.statusFilter,
				onStatus: queue.setStatusFilter,
				sort: queue.sort,
				onSort: queue.setSort,
				placeholder: "Search by equipment, buyer, email, or company"
			}), buyerRequests.length === 0 ? /* @__PURE__ */ jsx(EmptyState$1, { text: "No buyer requests have been submitted yet." }) : queue.visible.length === 0 ? /* @__PURE__ */ jsx(NoResults$1, { onClear: queue.clear }) : /* @__PURE__ */ jsx(DataTable, {
				columns: REQUEST_COLUMNS$1,
				rows: queue.visible,
				rowKey: (request) => request.id,
				onRowClick: (request) => setActiveId(request.id),
				rowLabel: (request) => `Review request for ${request.equipment_type}`,
				caption: "Buyer equipment requests awaiting broker review"
			})]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: "Buyer request",
			title: active?.equipment_type ?? "",
			children: active && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ jsxs("dl", {
					className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Buyer",
							value: active.buyer
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Email",
							value: active.email
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Phone",
							value: active.phone
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Company",
							value: active.company_name
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Budget range",
							value: active.budget_range
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Location preference",
							value: active.location_preference
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Timeline",
							value: active.timeline
						}),
						/* @__PURE__ */ jsx(Detail$3, {
							label: "Submitted",
							value: active.created_at
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx("dt", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
								children: "Specifications"
							}), /* @__PURE__ */ jsx("dd", {
								className: "mt-1 whitespace-pre-line text-neutral-700",
								children: active.specifications || "Not provided"
							})]
						})
					]
				}), /* @__PURE__ */ jsxs("div", {
					className: "border-t border-[#dad5cb] pt-6",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
						children: "Request status"
					}), /* @__PURE__ */ jsx("div", {
						className: "mt-3",
						children: /* @__PURE__ */ jsx(StatusForm, {
							value: active.status,
							options: buyerStatusOptions,
							action: `/broker/buyer-requests/${active.id}`
						}, `${active.id}:${active.status}`)
					})]
				})]
			})
		})]
	})] });
}
/** Column layout for the buyer queue. Mirrors the seller queue's responsive priorities. */
var REQUEST_COLUMNS$1 = [
	{
		key: "equipment",
		header: "Equipment",
		cell: (request) => /* @__PURE__ */ jsx(CellStack, {
			primary: /* @__PURE__ */ jsx("span", {
				className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
				children: request.equipment_type
			}),
			secondary: request.location_preference
		})
	},
	{
		key: "buyer",
		header: "Buyer",
		hideBelow: "lg",
		cell: (request) => /* @__PURE__ */ jsx(CellStack, {
			primary: request.buyer ?? "—",
			secondary: request.email ?? void 0
		})
	},
	{
		key: "budget",
		header: "Budget",
		hideBelow: "md",
		align: "right",
		cell: (request) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: request.budget_range || "—"
		})
	},
	{
		key: "timeline",
		header: "Timeline",
		hideBelow: "xl",
		cell: (request) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: request.timeline || "—"
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (request) => /* @__PURE__ */ jsx(StatusBadge$4, {
			status: request.status,
			label: request.status_label
		})
	}
];
//#endregion
//#region resources/js/Pages/Broker/Submissions.tsx
var Submissions_exports = /* @__PURE__ */ __exportAll({ default: () => BrokerSubmissions });
/**
* The seller review queue, and the broker's landing page.
*
* This used to be one page holding both queues behind tabs, with every submission's
* full review form expanding inline — a single very long scroll. The buyer queue is now
* its own sidebar destination (Pages/Broker/Requests), and the review form opens in a
* slide-over so the list itself stays a scannable set of rows.
*/
function BrokerSubmissions({ portal, sellerSubmissions, sellerStatusOptions, offerStatusOptions }) {
	const { status } = usePage().props;
	const [activeId, setActiveId] = useState(null);
	const active = sellerSubmissions.find((submission) => submission.id === activeId) ?? null;
	const queue = useQueue(sellerSubmissions, sellerStatusOptions, (item) => [
		item.title,
		item.seller,
		item.email,
		item.company,
		item.phone,
		item.category,
		item.region,
		item.city,
		item.status_label,
		item.public_id
	]);
	const needsReview = sellerSubmissions.filter((item) => item.status === "under_review").length;
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Seller Submissions | Broker Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "Seller Submissions",
		eyebrow: `${sellerSubmissions.length} total${needsReview > 0 ? ` · ${needsReview} need review` : ""}`,
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsx(QueueToolbar, {
				search: queue.search,
				onSearch: queue.onSearch,
				chips: queue.chips,
				activeStatus: queue.statusFilter,
				onStatus: queue.setStatusFilter,
				sort: queue.sort,
				onSort: queue.setSort,
				placeholder: "Search by title, seller, email, or ID"
			}), sellerSubmissions.length === 0 ? /* @__PURE__ */ jsx(EmptyState$1, { text: "No seller equipment has been submitted yet." }) : queue.visible.length === 0 ? /* @__PURE__ */ jsx(NoResults$1, { onClear: queue.clear }) : /* @__PURE__ */ jsx(DataTable, {
				columns: SUBMISSION_COLUMNS,
				rows: queue.visible,
				rowKey: (submission) => submission.id,
				onRowClick: (submission) => setActiveId(submission.id),
				rowLabel: (submission) => `Review ${submission.title}`,
				caption: "Seller equipment submissions awaiting broker review"
			})]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: active?.public_id ?? "Review submission",
			title: active?.title ?? "",
			children: active && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
				children: [
					active.is_unclaimed_lead && /* @__PURE__ */ jsxs("p", {
						className: "rounded-lg border border-[#a56437]/30 bg-[#f4ece4] px-4 py-3 text-sm leading-6 text-[#8a5330]",
						children: [/* @__PURE__ */ jsx("strong", {
							className: "font-semibold",
							children: "Unclaimed lead."
						}), " This came from the public form without a signed-in seller, so there is no account to message. Reach out using the contact details below."]
					}),
					/* @__PURE__ */ jsxs("dl", {
						className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Detail$3, {
								label: active.is_unclaimed_lead ? "Contact" : "Seller",
								value: active.seller
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Company",
								value: active.company
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Email",
								value: active.email
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Phone",
								value: active.phone
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Category",
								value: active.category
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Region",
								value: regionOf(active)
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Condition",
								value: active.condition_label
							}),
							active.quantity > 1 && /* @__PURE__ */ jsx(Detail$3, {
								label: "Quantity",
								value: `${active.quantity} units`
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Asking price",
								value: active.needs_valuation ? "Valuation requested" : active.asking_price ? formatUSD$2(active.asking_price) : null
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Photos",
								value: `${active.photo_count} uploaded`
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Submitted",
								value: active.created_at
							}),
							/* @__PURE__ */ jsx(Detail$3, {
								label: "Submitted via",
								value: sourceLabel(active.source)
							}),
							active.ownership_label && /* @__PURE__ */ jsx(Detail$3, {
								label: "Owns the equipment",
								value: active.ownership_label
							}),
							active.availability_label && /* @__PURE__ */ jsx(Detail$3, {
								label: "Available to sell",
								value: active.availability_label
							}),
							active.value_range_label && /* @__PURE__ */ jsx(Detail$3, {
								label: "Seller's value estimate",
								value: active.value_range_label
							}),
							active.intent_labels.length > 0 && /* @__PURE__ */ jsxs("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: "Looking to"
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 text-neutral-700",
									children: active.intent_labels.join(" · ")
								})]
							}),
							active.condition_notes && /* @__PURE__ */ jsxs("div", {
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: "Condition notes (private)"
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 whitespace-pre-line text-neutral-700",
									children: active.condition_notes
								})]
							})
						]
					}),
					/* @__PURE__ */ jsx(SellerReviewForm, {
						submission: active,
						options: sellerStatusOptions
					}, `${active.id}:${active.status}`),
					/* @__PURE__ */ jsx(OfferManager, {
						submission: active,
						statusOptions: offerStatusOptions
					})
				]
			})
		})]
	})] });
}
/**
* "Wyoming — Powder River" / "Wyoming — Casper". The portal form collects a city, the public
* form collects a Wyoming sub-region instead; a row carries at most one of them.
*/
function regionOf(submission) {
	const detail = submission.city ?? submission.wyoming_subregion_label;
	return detail ? `${submission.region} — ${detail}` : submission.region;
}
/**
* Flags a submission with nobody behind it. The broker's whole workflow changes: there is no
* account to message and no seller who can answer an offer, so the contact details on the row
* are the only way to reach this person.
*/
function sourceLabel(source) {
	return source === "public" ? "Public website form" : "Seller portal";
}
function UnclaimedLeadChip() {
	return /* @__PURE__ */ jsx("span", {
		className: "rounded-full bg-[#f4ece4] px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-[#8a5330]",
		children: "Unclaimed lead"
	});
}
/**
* Column layout for the seller queue. Equipment and Status stay at every width; the
* rest drop away on smaller screens rather than forcing a sideways scroll to read a row.
*/
var SUBMISSION_COLUMNS = [
	{
		key: "equipment",
		header: "Equipment",
		cell: (submission) => {
			const openOffers = submission.offers.filter((offer) => offer.status === "pending" || offer.status === "countered").length;
			return /* @__PURE__ */ jsx(CellStack, {
				primary: /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
						children: submission.title
					}),
					submission.public_id && /* @__PURE__ */ jsx("span", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#a56437]",
						children: submission.public_id
					}),
					openOffers > 0 && /* @__PURE__ */ jsx("span", {
						className: "rounded-full bg-amber-50 px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-amber-800",
						children: openOffers === 1 ? "Offer open" : `${openOffers} offers open`
					}),
					submission.is_unclaimed_lead && /* @__PURE__ */ jsx(UnclaimedLeadChip, {})
				] }),
				secondary: `${submission.category} · ${regionOf(submission)}${submission.quantity > 1 ? ` · ${submission.quantity} units` : ""}`
			});
		}
	},
	{
		key: "seller",
		header: "Seller",
		hideBelow: "lg",
		cell: (submission) => /* @__PURE__ */ jsx(CellStack, {
			primary: submission.seller ?? "—",
			secondary: submission.email ?? void 0
		})
	},
	{
		key: "price",
		header: "Asking price",
		hideBelow: "md",
		align: "right",
		cell: (submission) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: summaryPrice(submission)
		})
	},
	{
		key: "submitted",
		header: "Submitted",
		hideBelow: "xl",
		cell: (submission) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: submission.created_at ?? "—"
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (submission) => /* @__PURE__ */ jsx(StatusBadge$4, {
			status: submission.status,
			label: submission.status_label
		})
	}
];
function SellerReviewForm({ submission, options }) {
	const form = useForm({
		status: submission.status,
		public_description: submission.public_description ?? "",
		manufacturer: submission.manufacturer ?? "",
		model: submission.model ?? "",
		year: submission.year != null ? String(submission.year) : "",
		capacity: submission.capacity ?? "",
		featured: submission.featured,
		documents_public: submission.documents.map((document) => document.public)
	});
	const errors = form.errors;
	function submit(event) {
		event.preventDefault();
		form.patch(`/broker/seller-submissions/${submission.id}`, {
			preserveScroll: true,
			onSuccess: () => form.setDefaults()
		});
	}
	return /* @__PURE__ */ jsxs("form", {
		onSubmit: submit,
		className: "border-t border-[#dad5cb] pt-6",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
				children: "Broker Enrichment"
			}),
			errors.publish_block && /* @__PURE__ */ jsx("p", {
				className: "mt-3 rounded-lg border border-[#b3261e]/30 bg-red-50 px-4 py-3 text-sm leading-6 text-[#b3261e]",
				children: errors.publish_block
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-4 grid gap-4 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(EnrichField, {
						label: "Public description",
						error: errors.public_description,
						className: "sm:col-span-2",
						children: /* @__PURE__ */ jsx("textarea", {
							value: form.data.public_description,
							onChange: (event) => form.setData("public_description", event.target.value),
							className: `portal-input min-h-24 py-3${errors.public_description ? " portal-input-error" : ""}`,
							placeholder: "Buyer-facing description. Required to publish. Never shows raw seller notes."
						})
					}),
					/* @__PURE__ */ jsx(EnrichField, {
						label: "Manufacturer",
						error: errors.manufacturer,
						children: /* @__PURE__ */ jsx("input", {
							value: form.data.manufacturer,
							onChange: (event) => form.setData("manufacturer", event.target.value),
							className: "portal-input"
						})
					}),
					/* @__PURE__ */ jsx(EnrichField, {
						label: "Model",
						error: errors.model,
						children: /* @__PURE__ */ jsx("input", {
							value: form.data.model,
							onChange: (event) => form.setData("model", event.target.value),
							className: "portal-input"
						})
					}),
					/* @__PURE__ */ jsx(EnrichField, {
						label: "Year",
						error: errors.year,
						children: /* @__PURE__ */ jsx("input", {
							type: "number",
							inputMode: "numeric",
							value: form.data.year,
							onChange: (event) => form.setData("year", event.target.value),
							className: `portal-input${errors.year ? " portal-input-error" : ""}`
						})
					}),
					/* @__PURE__ */ jsx(EnrichField, {
						label: "Capacity",
						error: errors.capacity,
						children: /* @__PURE__ */ jsx("input", {
							value: form.data.capacity,
							onChange: (event) => form.setData("capacity", event.target.value),
							className: "portal-input"
						})
					})
				]
			}),
			submission.documents.length > 0 && /* @__PURE__ */ jsxs("div", {
				className: "mt-5",
				children: [/* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
					children: "Documents — mark public"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-2 grid gap-2",
					children: submission.documents.map((document, index) => /* @__PURE__ */ jsxs("label", {
						className: "flex items-center gap-3 rounded-lg border border-[#dad5cb] bg-white p-3",
						children: [
							/* @__PURE__ */ jsx("input", {
								type: "checkbox",
								checked: form.data.documents_public[index] ?? false,
								onChange: (event) => form.setData("documents_public", form.data.documents_public.map((value, i) => i === index ? event.target.checked : value)),
								className: "h-4 w-4 shrink-0 accent-[#a56437]"
							}),
							/* @__PURE__ */ jsx("span", {
								className: "min-w-0 truncate text-sm font-semibold text-neutral-900",
								children: document.name
							}),
							/* @__PURE__ */ jsx("span", {
								className: "ml-auto font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-400",
								children: form.data.documents_public[index] ?? false ? "Public" : "Private"
							})
						]
					}, `${document.name}-${index}`))
				})]
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "mt-5 flex w-fit cursor-pointer items-center gap-3",
				children: [/* @__PURE__ */ jsx("input", {
					type: "checkbox",
					checked: form.data.featured,
					onChange: (event) => form.setData("featured", event.target.checked),
					className: "h-4 w-4 shrink-0 accent-[#a56437]"
				}), /* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700",
					children: "Feature on homepage & top of marketplace"
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-6 flex flex-wrap items-end gap-3 border-t border-[#dad5cb] pt-5",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Listing status"
						}), /* @__PURE__ */ jsx("select", {
							value: form.data.status,
							onChange: (event) => form.setData("status", event.target.value),
							className: "polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: Object.entries(options).map(([status, label]) => /* @__PURE__ */ jsx("option", {
								value: status,
								children: label
							}, status))
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: form.processing || !form.isDirty,
						className: "button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
						children: form.data.status === "published" ? "Publish" : "Save"
					}),
					!form.isDirty && !form.processing && /* @__PURE__ */ jsx("span", {
						className: "pb-2.5 text-sm text-neutral-400",
						children: "No unsaved changes"
					})
				]
			})
		]
	});
}
function EnrichField({ label, error, className = "", children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `grid gap-2 ${className}`,
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			})
		]
	});
}
function OfferManager({ submission, statusOptions }) {
	const defaultStatus = "pending" in statusOptions ? "pending" : Object.keys(statusOptions)[0] ?? "";
	const form = useForm({
		amount: "",
		offered_at: todayIso(),
		status: defaultStatus
	});
	const errors = form.errors;
	const openOffer = submission.offers.find((offer) => offer.status === "pending" || offer.status === "countered");
	function submit(event) {
		event.preventDefault();
		form.post(`/broker/seller-submissions/${submission.id}/offers`, {
			preserveScroll: true,
			onSuccess: () => form.reset("amount")
		});
	}
	return /* @__PURE__ */ jsxs("section", {
		className: "border-t border-[#dad5cb] pt-6",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
				children: "Offers"
			}),
			submission.offers.length > 0 ? /* @__PURE__ */ jsx("div", {
				className: "mt-3 grid gap-2",
				children: submission.offers.map((offer) => /* @__PURE__ */ jsx(OfferRow, { offer }, offer.id))
			}) : /* @__PURE__ */ jsx("p", {
				className: "mt-3 text-sm leading-6 text-neutral-500",
				children: "No offers logged yet."
			}),
			submission.is_unclaimed_lead ? /* @__PURE__ */ jsx("p", {
				className: "mt-4 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-600",
				children: "Offers cannot be logged against an unclaimed lead. An offer is answered by the seller from their own Offers page, and this submission has no account behind it — one logged here could never be accepted, declined, or countered. Negotiate using the contact details above; once this person has a seller account the submission can be attached to it."
			}) : openOffer ? /* @__PURE__ */ jsx("p", {
				className: "mt-4 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-600",
				children: openOffer.status === "countered" ? `The seller countered ${formatUSD$2(openOffer.counter_amount ?? openOffer.amount)}. Accept, decline, or re-offer above — a re-offer replaces this negotiation rather than starting a second one.` : `${formatUSD$2(openOffer.amount)} is awaiting the seller's response. You can log another offer once the seller accepts, declines, or counters it.`
			}) : /* @__PURE__ */ jsxs("form", {
				onSubmit: submit,
				className: "mt-4 flex flex-wrap items-end gap-3",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Amount (USD)"
						}), /* @__PURE__ */ jsx("input", {
							type: "number",
							min: "0",
							step: "0.01",
							inputMode: "decimal",
							value: form.data.amount,
							onChange: (event) => form.setData("amount", event.target.value),
							placeholder: "USD",
							"aria-invalid": Boolean(errors.amount),
							className: `portal-input sm:w-44${errors.amount ? " portal-input-error" : ""}`
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Offer date"
						}), /* @__PURE__ */ jsx("input", {
							type: "date",
							value: form.data.offered_at,
							onChange: (event) => form.setData("offered_at", event.target.value),
							"aria-invalid": Boolean(errors.offered_at),
							className: `portal-input sm:w-44${errors.offered_at ? " portal-input-error" : ""}`
						})]
					}),
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Offer status"
						}), /* @__PURE__ */ jsx("select", {
							value: form.data.status,
							onChange: (event) => form.setData("status", event.target.value),
							className: "polished-select h-10 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] pl-3 pr-9 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: Object.entries(statusOptions).map(([status, label]) => /* @__PURE__ */ jsx("option", {
								value: status,
								children: label
							}, status))
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: form.processing || form.data.amount.trim() === "",
						className: "button-press focus-copper h-10 rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
						children: "Log offer"
					})
				]
			}),
			(errors.amount || errors.offered_at || errors.status) && /* @__PURE__ */ jsx("p", {
				className: "mt-2 text-sm text-[#b3261e]",
				children: errors.amount ?? errors.offered_at ?? errors.status
			})
		]
	});
}
/**
* One logged offer. Read-only until the seller counters — at that point the ball is in
* the broker's court (`can_respond`) and the counter is resolved in place: accept the
* seller's number, decline it, or re-offer, which sends the offer back as Pending.
*/
function OfferRow({ offer }) {
	const [reofferOpen, setReofferOpen] = useState(false);
	const form = useForm({
		action: "",
		amount: ""
	});
	function respond(action) {
		form.transform((data) => ({
			...data,
			action,
			amount: ""
		}));
		form.patch(`/broker/offers/${offer.id}`, { preserveScroll: true });
	}
	function submitReoffer(event) {
		event.preventDefault();
		form.transform((data) => ({
			...data,
			action: "counter"
		}));
		form.patch(`/broker/offers/${offer.id}`, {
			preserveScroll: true,
			onSuccess: () => {
				setReofferOpen(false);
				form.reset("amount");
			}
		});
	}
	const amountError = form.errors.amount;
	const agreedAtCounter = offer.status === "accepted" && Boolean(offer.counter_amount);
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsxs("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ jsx("p", {
					className: "font-heading text-base font-semibold text-neutral-900",
					children: formatUSD$2(agreedAtCounter ? offer.counter_amount : offer.amount)
				}), /* @__PURE__ */ jsxs("p", {
					className: "mt-0.5 text-xs text-neutral-500",
					children: [
						"Offered ",
						offer.offered_at ?? "n/a",
						offer.counter_amount ? agreedAtCounter ? ` · Agreed at the seller's counter (offered ${formatUSD$2(offer.amount)})` : ` · Seller countered ${formatUSD$2(offer.counter_amount)}` : ""
					]
				})]
			}), /* @__PURE__ */ jsx(StatusBadge$4, {
				status: offer.status,
				label: offer.status_label
			})]
		}), offer.can_respond && /* @__PURE__ */ jsxs("div", {
			className: "mt-3 border-t border-[#dad5cb] pt-3",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
					children: "Respond to counter"
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-2 flex flex-wrap items-center gap-2",
					children: [
						/* @__PURE__ */ jsxs("button", {
							type: "button",
							disabled: form.processing,
							onClick: () => respond("accept"),
							className: "button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg bg-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
							children: ["Accept ", formatUSD$2(offer.counter_amount ?? offer.amount)]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: form.processing,
							onClick: () => respond("decline"),
							className: "button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg border border-[#b3261e] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#b3261e] transition-colors hover:bg-[#b3261e] hover:text-white disabled:opacity-60",
							children: "Decline"
						}),
						/* @__PURE__ */ jsx("button", {
							type: "button",
							disabled: form.processing,
							onClick: () => setReofferOpen((open) => !open),
							"aria-expanded": reofferOpen,
							className: "button-press focus-copper inline-flex h-9 items-center justify-center rounded-lg border border-[#a56437] px-4 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60",
							children: "Re-offer"
						})
					]
				}),
				reofferOpen && /* @__PURE__ */ jsxs("form", {
					onSubmit: submitReoffer,
					className: "mt-3 flex flex-wrap items-end gap-2",
					children: [
						/* @__PURE__ */ jsxs("label", {
							className: "grid gap-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
								children: "New amount (USD)"
							}), /* @__PURE__ */ jsx("input", {
								type: "number",
								min: "0",
								step: "0.01",
								inputMode: "decimal",
								value: form.data.amount,
								onChange: (event) => form.setData("amount", event.target.value),
								placeholder: "USD",
								"aria-invalid": Boolean(amountError),
								className: `portal-input sm:w-44${amountError ? " portal-input-error" : ""}`
							})]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: form.processing,
							className: "button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
							children: "Send re-offer"
						}),
						amountError && /* @__PURE__ */ jsx("span", {
							className: "text-sm text-[#b3261e]",
							children: amountError
						})
					]
				})
			]
		})]
	});
}
//#endregion
//#region resources/js/Pages/Contact.tsx
var Contact_exports = /* @__PURE__ */ __exportAll({ default: () => Contact });
var pageTitle$6 = "Contact Petra | Let's Move Something";
var pageDescription$6 = "If you've got equipment to sell or you're trying to source something for a job, reach out. Petra will tell you straight up if we can help or not.";
var contactOptions = [
	"Submit equipment",
	"Request equipment",
	"Call a broker",
	"General inquiry"
];
function Contact({ canonicalUrl, ogImageUrl, assetContext }) {
	const hasAssetContext = Boolean(assetContext?.asset || assetContext?.equipment);
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "ContactPage",
			"@id": `${canonicalUrl}#contact`,
			name: "Contact Petra",
			url: canonicalUrl,
			description: pageDescription$6,
			about: [
				"Used oilfield equipment brokerage",
				"Equipment sourcing",
				"Industrial surplus equipment"
			]
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/contact$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Contact",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$6,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$6
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
				content: pageTitle$6
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$6
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
				content: "Oilfield equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$6
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$6
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
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
				children: /* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
						children: "Let's Move Something"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "If you've got equipment to sell or you're trying to source something for a job, just reach out. We'll tell you straight up if we can help or not."
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 flex flex-col gap-4 sm:flex-row",
						children: [/* @__PURE__ */ jsx("a", {
							href: "/sell-equipment",
							className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
							children: "Sell Equipment"
						}), /* @__PURE__ */ jsx("a", {
							href: "/request-equipment",
							className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Request Equipment"
						})]
					}),
					hasAssetContext && /* @__PURE__ */ jsxs("div", {
						className: "mt-8 border border-[#dad5cb] bg-[#f3f1ec] p-5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
							children: "Broker Context"
						}), /* @__PURE__ */ jsxs("p", {
							className: "mt-2 text-base leading-7 text-neutral-700",
							children: [assetContext?.equipment ?? "Equipment inquiry", assetContext?.asset ? ` - ${assetContext.asset}` : ""]
						})]
					})
				] })
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1280px] px-5 sm:px-10",
				children: [/* @__PURE__ */ jsx("div", {
					className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-4",
					children: contactOptions.map((option) => /* @__PURE__ */ jsxs("article", {
						className: "bg-white p-7",
						children: [/* @__PURE__ */ jsx("div", { className: "mb-5 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: option
						})]
					}, option))
				}), /* @__PURE__ */ jsx("p", {
					className: "mx-auto mt-10 max-w-3xl text-center text-lg leading-8 text-neutral-600",
					children: "We respond quickly because equipment decisions don't wait."
				})]
			})
		})]
	})] });
}
//#endregion
//#region resources/js/navigation.ts
/**
* Where the current page was reached from, plus remembered scroll offsets.
*
* Returning to a long list has to put the buyer back where they were regardless of how
* they got there — the in-page back link, the top nav, or the browser back button.
* Those take three different routes through the stack:
*
*   - Inertia <Link> visits are client-side, so document.referrer is never updated and
*     only the tracker below knows the previous page.
*   - Plain <a> navigations are full page loads that wipe the tracker, but the browser
*     does set document.referrer.
*   - Browser back is a popstate, which fires 'navigate' but never 'before'.
*
* TIMING: the previous page is recorded on 'before', not 'navigate'. 'navigate' fires
* after React has committed the incoming page, so a component reading the tracker in
* its first effect would always see the state from before the visit. 'before' fires
* while the outgoing page is still mounted, which is early enough.
*/
var previousUrl = null;
var SCROLL_PREFIX = "petra:scroll:";
var leaveHandlers = /* @__PURE__ */ new Set();
/**
* Runs a callback at the moment the user navigates away, with the destination path.
*
* Scroll offsets are captured here rather than on every scroll event: during a visit
* the page keeps emitting scroll events — including Inertia's own reset to the top on
* arrival — so a continuously-saving listener overwrites the departure position with a
* mid-transition value and then with 0.
*
* Knowing the destination is what lets a page decide whether the position is worth
* keeping ("off to a detail page, I'll be back") or should be dropped ("off elsewhere,
* next arrival is a fresh visit"). That decision has to happen on the way OUT, because
* on the way back in there is no reliable way to tell how the user got there —
* popstate never fires 'before', so the tracker is a step behind on browser back.
*
* @return unsubscribe
*/
function onLeavingPage(handler) {
	leaveHandlers.add(handler);
	return () => {
		leaveHandlers.delete(handler);
	};
}
/**
* Pathname of the page the user came from, or null on a cold entry (typed URL, shared
* link, search result). Prefers the tracker, since on a client-side visit
* document.referrer still points at whatever last caused a full page load.
*/
function previousPath() {
	if (previousUrl !== null) return previousUrl.split("?")[0];
	if (typeof document === "undefined" || document.referrer === "") return null;
	try {
		const referrer = new URL(document.referrer);
		return referrer.origin === window.location.origin ? referrer.pathname : null;
	} catch {
		return null;
	}
}
function arrivedFrom(path) {
	return previousPath() === path;
}
function saveScroll(key) {
	if (typeof window === "undefined") return;
	window.sessionStorage.setItem(SCROLL_PREFIX + key, String(Math.round(window.scrollY)));
}
/**
* sessionStorage rather than memory: a plain <a> navigation reloads the document and
* destroys anything held in JS.
*/
function clearScroll(key) {
	if (typeof window === "undefined") return;
	window.sessionStorage.removeItem(SCROLL_PREFIX + key);
}
function readScroll(key) {
	if (typeof window === "undefined") return null;
	const stored = Number(window.sessionStorage.getItem(SCROLL_PREFIX + key));
	return Number.isFinite(stored) && stored > 0 ? stored : null;
}
//#endregion
//#region resources/js/scroll-memory.ts
var RESTORE_FRAMES = 40;
/**
* Returns a list to the position it was left at when the user comes back from one of
* its detail pages.
*
* Opening the last row of a long list and then heading back used to land at the top,
* forcing a re-scroll. This restores the offset for every route back — an in-page back
* link, a nav item (a full page reload), and the browser back button.
*
* THE DECISION IS MADE ON THE WAY OUT. Detecting "the user is coming back" on arrival
* is not reliable: browser back is a popstate, which never fires Inertia's 'before'
* event, so any "where did I come from" check is a step stale by the time the list
* mounts. Leaving *for a detail page* is unambiguous, so a stored offset simply means
* "expected back". Leaving anywhere else drops it and the next arrival starts at the
* top, which is what a genuinely fresh visit should do.
*/
function useScrollMemory({ key, detailPrefix }) {
	useEffect(() => onLeavingPage((target) => {
		if (target !== null && target.startsWith(detailPrefix)) saveScroll(key);
		else clearScroll(key);
	}), [key, detailPrefix]);
	useEffect(() => {
		const target = readScroll(key);
		if (target === null) return;
		clearScroll(key);
		const jumpTo = (top) => window.scrollTo({
			top,
			left: 0,
			behavior: "instant"
		});
		let frame = 0;
		let attempts = 0;
		const apply = () => {
			if (Math.abs(window.scrollY - target) > 2) jumpTo(target);
			attempts += 1;
			if (attempts < RESTORE_FRAMES) frame = requestAnimationFrame(apply);
		};
		jumpTo(target);
		frame = requestAnimationFrame(apply);
		return () => cancelAnimationFrame(frame);
	}, [key]);
}
//#endregion
//#region resources/js/Pages/Equipment.tsx
var Equipment_exports = /* @__PURE__ */ __exportAll({ default: () => Equipment });
var PLACEHOLDER_IMAGE$1 = "/images/petra-equipment-yard-hero.png";
function fallbackToPlaceholder$1(event) {
	if (!event.currentTarget.src.endsWith(PLACEHOLDER_IMAGE$1)) event.currentTarget.src = PLACEHOLDER_IMAGE$1;
}
var availabilityPill = {
	success: "bg-emerald-700 text-white",
	warning: "bg-amber-600 text-white",
	muted: "bg-neutral-700 text-white",
	neutral: "bg-neutral-700 text-white",
	danger: "bg-[#b3261e] text-white"
};
var emptyFilters = {
	category: "",
	condition: "",
	region: "",
	manufacturer: "",
	availability: ""
};
var pageTitle$5 = "Used Oilfield Equipment Marketplace | Petra";
var pageDescription$5 = "Browse used oilfield and industrial equipment handled by Petra, including compressors, separators, tank batteries, and pump packages across Wyoming, the Rockies, and the Bakken.";
function Equipment({ canonicalUrl, ogImageUrl, listings, filterOptions, categories }) {
	const [filters, setFilters] = useRemember(emptyFilters, "equipment-filters");
	useScrollMemory({
		key: "equipment-listings",
		detailPrefix: "/equipment/"
	});
	const hasActiveFilters = Object.values(filters).some(Boolean);
	const filterControls = [
		{
			key: "category",
			label: "Category",
			options: filterOptions.category
		},
		{
			key: "condition",
			label: "Condition",
			options: filterOptions.condition
		},
		{
			key: "region",
			label: "Location",
			options: filterOptions.region
		},
		{
			key: "manufacturer",
			label: "Manufacturer",
			options: filterOptions.manufacturer
		},
		{
			key: "availability",
			label: "Availability",
			options: filterOptions.availability
		}
	];
	const filteredListings = useMemo(() => listings.filter((listing) => (!filters.category || listing.category === filters.category) && (!filters.condition || listing.condition === filters.condition) && (!filters.region || listing.region === filters.region) && (!filters.manufacturer || listing.manufacturer === filters.manufacturer) && (!filters.availability || listing.availability === filters.availability)), [listings, filters]);
	const hasListings = listings.length > 0;
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "CollectionPage",
				"@id": `${canonicalUrl}#equipment-marketplace`,
				name: "Used Oilfield Equipment Marketplace",
				url: canonicalUrl,
				description: pageDescription$5,
				isPartOf: {
					"@type": "WebSite",
					name: "Petra",
					url: canonicalUrl.replace(/\/equipment$/, "")
				},
				about: categories
			},
			{
				"@type": "BreadcrumbList",
				"@id": `${canonicalUrl}#breadcrumbs`,
				itemListElement: [{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: canonicalUrl.replace(/\/equipment$/, "")
				}, {
					"@type": "ListItem",
					position: 2,
					name: "Equipment",
					item: canonicalUrl
				}]
			},
			{
				"@type": "ItemList",
				"@id": `${canonicalUrl}#featured-equipment`,
				name: "Used oilfield equipment available through Petra",
				itemListElement: listings.map((listing, index) => ({
					"@type": "ListItem",
					position: index + 1,
					item: {
						"@type": "Product",
						name: listing.title,
						category: listing.category,
						description: listing.description,
						identifier: listing.public_id,
						...listing.manufacturer ? { brand: {
							"@type": "Brand",
							name: listing.manufacturer
						} } : {}
					}
				}))
			}
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$5,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$5
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
				content: pageTitle$5
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$5
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
				content: pageTitle$5
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$5
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
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 py-20 sm:px-10 lg:grid-cols-[minmax(0,1fr)_auto] lg:items-end lg:py-24",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsxs("div", {
						className: "mb-7 flex flex-wrap gap-3",
						children: [/* @__PURE__ */ jsx("span", {
							className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]",
							children: "Equipment Marketplace"
						}), /* @__PURE__ */ jsx("span", {
							className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600",
							children: "Brokerage Verified"
						})]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.4rem] lg:text-[4.2rem]",
						children: "Available Equipment"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: "Real equipment currently available through Petra brokerage network. Inventory changes quickly—availability is subject to market movement."
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "flex flex-col gap-4 sm:flex-row lg:flex-col",
					children: [/* @__PURE__ */ jsx("a", {
						href: "#featured-equipment",
						className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
						children: "View Equipment"
					}), /* @__PURE__ */ jsx("a", {
						href: "/request-equipment",
						className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
						children: "Request Equipment"
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("section", {
			id: "featured-equipment",
			className: "py-20 sm:py-24 lg:py-28",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[1280px] px-5 sm:px-10",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "mb-12 flex flex-col gap-8 md:mb-16 md:flex-row md:items-end md:justify-between",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Featured Equipment"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Available Listings"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-5 text-lg leading-8 text-neutral-600",
								children: "Equipment currently available through Petra. Availability can move quickly, so use the inquiry CTA for current condition, location, and documentation."
							})
						]
					}), /* @__PURE__ */ jsx("a", {
						href: "/sell-equipment",
						className: "inline-flex h-16 w-fit items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
						children: "Sell Equipment"
					})]
				}), hasListings ? /* @__PURE__ */ jsxs(Fragment, { children: [
					/* @__PURE__ */ jsxs("div", {
						"data-polish-reveal": true,
						className: "mb-12 border border-[#dad5cb] bg-white p-6 shadow-[0_18px_45px_rgba(28,26,22,0.06)] sm:p-8",
						children: [/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-5",
							children: filterControls.map((filter) => /* @__PURE__ */ jsxs("label", {
								className: "flex flex-col gap-2",
								children: [/* @__PURE__ */ jsx("span", {
									className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: filter.label
								}), /* @__PURE__ */ jsxs("select", {
									value: filters[filter.key],
									onChange: (event) => setFilters((current) => ({
										...current,
										[filter.key]: event.target.value
									})),
									className: "h-12 border border-[#dad5cb] bg-[#f3f1ec] px-3 pr-9 font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950 outline-none transition-colors duration-200 hover:border-[#a56437]/60 focus:border-[#a56437]",
									children: [/* @__PURE__ */ jsxs("option", {
										value: "",
										children: ["All ", filter.label]
									}), filter.options.map((option) => /* @__PURE__ */ jsx("option", {
										value: option,
										children: option
									}, option))]
								})]
							}, filter.key))
						}), /* @__PURE__ */ jsxs("div", {
							className: "mt-6 flex flex-col gap-4 border-t border-[#dad5cb] pt-5 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ jsxs("p", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600",
								children: [
									"Showing ",
									filteredListings.length,
									" of ",
									listings.length,
									" listings"
								]
							}), hasActiveFilters && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => setFilters(emptyFilters),
								className: "inline-flex h-11 w-fit items-center justify-center border border-neutral-500 px-6 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Reset Filters"
							})]
						})]
					}),
					/* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3",
						children: filteredListings.map((listing) => {
							const specs = [
								listing.manufacturer,
								listing.year,
								listing.capacity
							].filter(Boolean).join(" · ");
							return /* @__PURE__ */ jsxs(Link, {
								href: listing.href,
								"data-polish-reveal": true,
								className: "group flex flex-col overflow-hidden border border-[#dad5cb] bg-white transition-[border-color,box-shadow,transform] duration-300 hover:-translate-y-1 hover:border-[#a56437] hover:shadow-[0_18px_40px_rgba(28,26,22,0.12)]",
								children: [/* @__PURE__ */ jsxs("figure", {
									className: "relative aspect-[4/3] overflow-hidden bg-neutral-950",
									children: [
										/* @__PURE__ */ jsx("img", {
											src: listing.image_url,
											alt: `${listing.title} — used oilfield equipment listed with Petra.`,
											loading: "lazy",
											onError: fallbackToPlaceholder$1,
											className: "absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
										}),
										/* @__PURE__ */ jsx("div", {
											className: "absolute inset-0 bg-gradient-to-t from-black/50 to-transparent",
											"aria-hidden": "true"
										}),
										/* @__PURE__ */ jsxs("div", {
											className: "absolute left-3 top-3 flex flex-wrap gap-2",
											children: [/* @__PURE__ */ jsx("span", {
												className: "bg-[#a56437] px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white",
												children: listing.category
											}), listing.featured && /* @__PURE__ */ jsx("span", {
												className: "bg-neutral-950 px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] text-white",
												children: "Featured"
											})]
										}),
										/* @__PURE__ */ jsx("span", {
											className: `absolute right-3 top-3 px-2.5 py-1 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.08em] ${availabilityPill[listing.status_tone] ?? availabilityPill.neutral}`,
											children: listing.availability
										}),
										/* @__PURE__ */ jsx("span", {
											className: "absolute bottom-3 right-3 font-heading text-[0.65rem] font-semibold tracking-[0.08em] text-white/70",
											children: listing.public_id
										})
									]
								}), /* @__PURE__ */ jsxs("div", {
									className: "flex flex-1 flex-col p-5",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-heading text-[0.7rem] font-semibold uppercase tracking-[0.12em] text-[#a56437]",
											children: listing.city ? `${listing.region} — ${listing.city}` : listing.region
										}),
										/* @__PURE__ */ jsx("h3", {
											className: "mt-2 line-clamp-2 font-heading text-xl font-semibold uppercase leading-tight tracking-[0.04em] text-neutral-950",
											children: listing.title
										}),
										/* @__PURE__ */ jsx("p", {
											className: "mt-2 line-clamp-2 text-sm leading-6 text-neutral-600",
											children: listing.description
										}),
										specs && /* @__PURE__ */ jsx("p", {
											className: "mt-4 line-clamp-1 font-heading text-xs font-semibold uppercase tracking-[0.08em] text-neutral-500",
											children: specs
										}),
										/* @__PURE__ */ jsxs("span", {
											className: "mt-auto flex items-center gap-2 pt-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors group-hover:text-neutral-950",
											children: ["View Details", /* @__PURE__ */ jsx("span", {
												"aria-hidden": "true",
												className: "transition-transform duration-300 group-hover:translate-x-1",
												children: "→"
											})]
										})
									]
								})]
							}, listing.public_id);
						})
					}),
					filteredListings.length === 0 && /* @__PURE__ */ jsxs("div", {
						className: "border border-[#dad5cb] bg-white p-8 text-center",
						children: [/* @__PURE__ */ jsx("p", {
							className: "text-lg leading-8 text-neutral-600",
							children: "No listed equipment matches those filters right now."
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setFilters(emptyFilters),
							className: "mt-6 inline-flex h-12 items-center justify-center border border-neutral-500 px-8 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "Reset Filters"
						})]
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mx-auto mt-12 max-w-3xl text-center text-lg leading-8 text-neutral-600",
						children: "If you see equipment that matches your needs, reach out early. High-quality assets move fast."
					})
				] }) : /* @__PURE__ */ jsxs("div", {
					className: "border border-[#dad5cb] bg-white p-10 text-center sm:p-16",
					children: [
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
							children: "New inventory is added regularly"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-5 max-w-2xl text-lg leading-8 text-neutral-600",
							children: "Tell us what you're looking for and Petra will source it through regional networks, operator relationships, and surplus yards."
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/request-equipment",
							className: "mt-8 inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
							children: "Request Equipment"
						})
					]
				})]
			})
		})]
	})] });
}
//#endregion
//#region resources/js/Components/back-link.tsx
/**
* A "back to the list" control that actually goes back.
*
* A plain link to the list is a forward navigation: it lands at the top with the list's
* own state (filters, search, page number) reset, so the user has to scroll and
* re-filter to find where they were. Popping the history entry instead is what lets
* Inertia restore the remembered state it saved on the way out.
*
* Cold entries — a shared link, a bookmark, a hop from somewhere else — have no list
* entry to pop, so those fall back to a normal visit.
*/
function BackLink({ href, className, children }) {
	const [canGoBack] = useState(() => arrivedFrom(href));
	if (!canGoBack) return /* @__PURE__ */ jsx(Link, {
		href,
		className,
		children
	});
	return /* @__PURE__ */ jsx("button", {
		type: "button",
		onClick: () => window.history.back(),
		className,
		children
	});
}
//#endregion
//#region resources/js/Pages/EquipmentDetail.tsx
var EquipmentDetail_exports = /* @__PURE__ */ __exportAll({ default: () => EquipmentDetail });
var PLACEHOLDER_IMAGE = "/images/petra-equipment-yard-hero.png";
function fallbackToPlaceholder(event) {
	if (!event.currentTarget.src.endsWith(PLACEHOLDER_IMAGE)) event.currentTarget.src = PLACEHOLDER_IMAGE;
}
function EquipmentDetail({ listing, canonicalUrl, ogImageUrl }) {
	const { auth, status } = usePage().props;
	const gallery = listing.photos.length > 0 ? listing.photos : [{
		url: listing.image_url,
		alt: listing.title
	}];
	const [selectedPhoto, setSelectedPhoto] = useState(gallery[0]);
	const isAuthed = Boolean(auth.user);
	const isBuyer = auth.user?.user_type === "buyer";
	const form = useForm({
		name: auth.user?.name ?? "",
		email: auth.user?.email ?? "",
		phone: auth.user?.phone ?? "",
		company_name: auth.user?.company_name ?? "",
		note: ""
	});
	const pageTitle = `${listing.title} | Petra Equipment Detail`;
	const pageDescription = `${listing.title} in ${listing.region}. Review availability, specs, media, and request quote details from Petra.`;
	const talkToBrokerUrl = `/contact?asset=${encodeURIComponent(listing.public_id)}&equipment=${encodeURIComponent(listing.title)}`;
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Product",
			"@id": `${canonicalUrl}#equipment`,
			name: listing.title,
			identifier: listing.public_id,
			category: listing.category,
			description: listing.description,
			...listing.manufacturer ? { brand: {
				"@type": "Brand",
				name: listing.manufacturer
			} } : {}
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [
				{
					"@type": "ListItem",
					position: 1,
					name: "Home",
					item: canonicalUrl.replace(/\/equipment\/[^/]+$/, "")
				},
				{
					"@type": "ListItem",
					position: 2,
					name: "Equipment",
					item: canonicalUrl.replace(/\/[^/]+$/, "")
				},
				{
					"@type": "ListItem",
					position: 3,
					name: listing.title,
					item: canonicalUrl
				}
			]
		}]
	};
	useEffect(() => {
		if (!status) return;
		toast.success(status, isBuyer ? {
			description: "Track it and the broker’s reply from your Quotes page.",
			action: {
				label: "View quotes",
				onClick: () => router.visit("/buyer/quotes")
			}
		} : void 0);
	}, [status, isBuyer]);
	function submit(event) {
		event.preventDefault();
		form.post(`/equipment/${listing.public_id}/inquiries`, {
			preserveScroll: true,
			onSuccess: () => form.setData("note", "")
		});
	}
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
				content: "product"
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
				content: selectedPhoto.alt
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
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] gap-8 px-5 py-10 sm:px-10 lg:grid-cols-[minmax(0,0.95fr)_minmax(420px,1.05fr)] lg:items-start lg:py-12",
				children: [/* @__PURE__ */ jsxs("div", { children: [
					/* @__PURE__ */ jsx(BackLink, {
						href: "/equipment",
						className: "focus-copper mb-6 inline-flex font-heading text-sm font-semibold uppercase tracking-[0.14em] text-[#a56437] underline-offset-4 hover:underline",
						children: "Back to Equipment"
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mb-5 flex flex-wrap gap-3",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-[#a56437]",
								children: listing.category
							}),
							/* @__PURE__ */ jsxs("span", {
								className: "border border-[#dad5cb] px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-neutral-600",
								children: ["ID: ", listing.public_id]
							}),
							listing.featured && /* @__PURE__ */ jsx("span", {
								className: "border border-[#dad5cb] bg-neutral-950 px-3 py-1 font-heading text-sm font-semibold uppercase tracking-[0.08em] text-white",
								children: "Featured"
							})
						]
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "max-w-4xl font-hero text-[2.2rem] font-bold uppercase leading-[1.03] tracking-[0.08em] text-neutral-950 sm:text-[2.8rem] lg:text-[3.3rem]",
						children: listing.title
					}),
					/* @__PURE__ */ jsxs("dl", {
						className: "mt-6 grid gap-px bg-[#dad5cb] sm:grid-cols-2",
						children: [/* @__PURE__ */ jsx(HeaderDetail, {
							label: "Availability",
							value: listing.availability,
							strong: true
						}), /* @__PURE__ */ jsx(HeaderDetail, {
							label: "Region",
							value: listing.city ? `${listing.region} — ${listing.city}` : listing.region
						})]
					})
				] }), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-3",
					children: [/* @__PURE__ */ jsxs("figure", {
						className: "relative aspect-[4/3] overflow-hidden bg-neutral-950",
						children: [
							/* @__PURE__ */ jsx("img", {
								src: selectedPhoto.url,
								alt: selectedPhoto.alt,
								onError: fallbackToPlaceholder,
								className: "absolute inset-0 h-full w-full object-cover opacity-95"
							}),
							/* @__PURE__ */ jsx("div", {
								className: "absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent",
								"aria-hidden": "true"
							}),
							/* @__PURE__ */ jsx("figcaption", {
								className: "absolute bottom-4 left-4 right-4 font-heading text-xl font-semibold uppercase tracking-[0.06em] text-white sm:text-2xl",
								children: listing.title
							})
						]
					}), gallery.length > 1 && /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-4 gap-2 sm:grid-cols-5",
						children: gallery.map((photo, index) => /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setSelectedPhoto(photo),
							className: `focus-copper relative aspect-[4/3] overflow-hidden border text-left ${selectedPhoto === photo ? "border-[#a56437]" : "border-[#dad5cb]"}`,
							"aria-label": `View ${photo.alt}`,
							children: /* @__PURE__ */ jsx("img", {
								src: photo.url,
								alt: "",
								loading: "lazy",
								onError: fallbackToPlaceholder,
								className: "absolute inset-0 h-full w-full object-cover"
							})
						}, `${photo.url}-${index}`))
					})]
				})]
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "py-10 sm:py-12",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto grid max-w-[1280px] gap-6 px-5 sm:px-10 lg:grid-cols-[minmax(0,0.72fr)_minmax(320px,0.28fr)] lg:items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-6",
					children: [/* @__PURE__ */ jsxs("section", {
						className: "border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Overview"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-4 text-lg leading-8 text-neutral-700",
								children: listing.description
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "mt-8 border-t border-[#dad5cb] pt-6 font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Specifications"
							}),
							/* @__PURE__ */ jsxs("dl", {
								className: "mt-4 grid gap-px bg-[#dad5cb] sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(DetailCell, {
										label: "Manufacturer",
										value: listing.specifications.manufacturer
									}),
									/* @__PURE__ */ jsx(DetailCell, {
										label: "Model",
										value: listing.specifications.model
									}),
									/* @__PURE__ */ jsx(DetailCell, {
										label: "Year",
										value: listing.specifications.year
									}),
									/* @__PURE__ */ jsx(DetailCell, {
										label: "Capacity",
										value: listing.specifications.capacity
									})
								]
							})
						]
					}), listing.documents.length > 0 && /* @__PURE__ */ jsx(DetailSection, {
						eyebrow: "Documents",
						title: "Available Files",
						children: /* @__PURE__ */ jsx("div", {
							className: "grid gap-px bg-[#dad5cb] sm:grid-cols-2",
							children: listing.documents.map((document) => /* @__PURE__ */ jsxs("a", {
								href: document.url,
								target: "_blank",
								rel: "noreferrer",
								className: "focus-copper flex items-center gap-3 bg-white p-4 transition-colors hover:bg-[#fbfaf8]",
								children: [/* @__PURE__ */ jsx(FileIcon$1, {}), /* @__PURE__ */ jsx("span", {
									className: "min-w-0 truncate font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
									children: document.name
								})]
							}, document.url))
						})
					})]
				}), /* @__PURE__ */ jsxs("aside", {
					id: "request-quote",
					className: "h-fit border border-[#dad5cb] bg-white p-6 lg:sticky lg:top-6",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Inquiry"
						}),
						/* @__PURE__ */ jsx("h2", {
							className: "mt-2 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: "Interested in this equipment?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-3 text-sm leading-6 text-neutral-600",
							children: "We can confirm availability, pricing, and arrange inspection."
						}),
						/* @__PURE__ */ jsxs("form", {
							onSubmit: submit,
							className: "mt-5 grid gap-4",
							children: [
								!isAuthed && /* @__PURE__ */ jsxs(Fragment, { children: [
									/* @__PURE__ */ jsx(Field$4, {
										label: "Name",
										error: form.errors.name,
										children: /* @__PURE__ */ jsx("input", {
											value: form.data.name,
											onChange: (event) => form.setData("name", event.target.value),
											className: "portal-input",
											required: true
										})
									}),
									/* @__PURE__ */ jsx(Field$4, {
										label: "Email",
										error: form.errors.email,
										children: /* @__PURE__ */ jsx("input", {
											type: "email",
											value: form.data.email,
											onChange: (event) => form.setData("email", event.target.value),
											className: "portal-input",
											required: true
										})
									}),
									/* @__PURE__ */ jsx(Field$4, {
										label: "Phone",
										error: form.errors.phone,
										children: /* @__PURE__ */ jsx("input", {
											value: form.data.phone,
											onChange: (event) => form.setData("phone", event.target.value),
											className: "portal-input",
											autoComplete: "tel"
										})
									}),
									/* @__PURE__ */ jsx(Field$4, {
										label: "Company",
										error: form.errors.company_name,
										children: /* @__PURE__ */ jsx("input", {
											value: form.data.company_name,
											onChange: (event) => form.setData("company_name", event.target.value),
											className: "portal-input",
											autoComplete: "organization"
										})
									})
								] }),
								isAuthed && /* @__PURE__ */ jsxs("p", {
									className: "border border-[#dad5cb] bg-[#f8f8f6] p-4 text-sm leading-6 text-neutral-600",
									children: [
										"Sending as ",
										/* @__PURE__ */ jsx("span", {
											className: "font-semibold text-neutral-900",
											children: auth.user?.name
										}),
										" (",
										auth.user?.email,
										")."
									]
								}),
								/* @__PURE__ */ jsx(Field$4, {
									label: "Note",
									error: form.errors.note,
									children: /* @__PURE__ */ jsx("textarea", {
										value: form.data.note,
										onChange: (event) => form.setData("note", event.target.value),
										className: "portal-input min-h-28 py-3"
									})
								}),
								/* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: form.processing,
									className: "button-press focus-copper inline-flex h-12 items-center justify-center bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
									children: form.processing ? "Submitting" : "Request Details"
								}),
								/* @__PURE__ */ jsx("a", {
									href: talkToBrokerUrl,
									className: "button-press focus-copper inline-flex h-12 items-center justify-center border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
									children: "Talk to Broker"
								})
							]
						})
					]
				})]
			})
		})]
	})] });
}
function DetailSection({ eyebrow, title, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "border border-[#dad5cb] bg-[#f8f8f6] p-6 sm:p-8",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
				children: eyebrow
			}),
			/* @__PURE__ */ jsx("h2", {
				className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
				children: title
			}),
			/* @__PURE__ */ jsx("div", {
				className: "mt-6",
				children
			})
		]
	});
}
function HeaderDetail({ label, value, strong = false }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-white p-4",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: `mt-1 font-heading text-lg font-semibold uppercase tracking-[0.06em] ${strong ? "text-[#a56437]" : "text-neutral-950"}`,
			children: value
		})]
	});
}
function DetailCell({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "bg-white p-5",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "font-heading text-xs font-semibold uppercase tracking-[0.1em] text-neutral-500",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "mt-2 text-base leading-7 text-neutral-700",
			children: value || "Available on request"
		})]
	});
}
function Field$4({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			})
		]
	});
}
function FileIcon$1() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-5 w-5 shrink-0 text-[#a56437]",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M7 3h7l4 4v14H7z" }),
			/* @__PURE__ */ jsx("path", { d: "M14 3v5h5" }),
			/* @__PURE__ */ jsx("path", { d: "M10 13h6" }),
			/* @__PURE__ */ jsx("path", { d: "M10 17h4" })
		]
	});
}
//#endregion
//#region resources/js/Components/polish.tsx
function classes(...values) {
	return values.filter(Boolean).join(" ");
}
function AnimatedPage({ busy = false, children, className, ...props }) {
	const pageRef = useRef(null);
	useEffect(() => {
		const page = pageRef.current;
		if (!page || !("IntersectionObserver" in window)) return;
		const targets = Array.from(page.querySelectorAll([
			"main > section:first-child h1",
			"main > section:first-child p",
			"main > section:first-child a",
			"main > section:first-child button",
			"main > section:first-child span",
			"main > section:not(:first-child) h2",
			"main > section:not(:first-child) h3",
			"main > section:not(:first-child) article",
			"main > section:not(:first-child) figure",
			"main > section:not(:first-child) li",
			"[data-polish-reveal]"
		].join(", ")));
		targets.forEach((target, index) => {
			target.classList.add("polish-reveal");
			target.style.setProperty("--reveal-delay", `${Math.min(index % 8, 7) * 45}ms`);
		});
		page.querySelectorAll("main a, main button").forEach((target) => {
			target.classList.add("button-press", "focus-copper");
		});
		page.querySelectorAll("main select").forEach((target) => {
			target.classList.add("polished-select", "focus-copper");
		});
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -10% 0px",
			threshold: .12
		});
		targets.forEach((target) => observer.observe(target));
		return () => observer.disconnect();
	}, [children]);
	return /* @__PURE__ */ jsx("div", {
		ref: pageRef,
		className: classes("animated-page transition-opacity duration-200", busy && "page-is-busy", className),
		"aria-busy": busy,
		...props,
		children
	});
}
function CtaLink({ variant = "primary", className, children, ...props }) {
	return /* @__PURE__ */ jsx("a", {
		className: classes("button-press focus-copper inline-flex h-14 items-center justify-center px-8 font-heading text-base font-semibold uppercase tracking-[0.1em]", {
			primary: "bg-[#a56437] text-white hover:bg-[#874d29]",
			outline: "border border-neutral-500 text-neutral-950 hover:bg-neutral-950 hover:text-white",
			dark: "border border-white/50 text-white hover:bg-white/10"
		}[variant], className),
		...props,
		children
	});
}
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
				/* @__PURE__ */ jsx(CtaLink, {
					href: "/",
					className: "mt-8 h-11 bg-[#9d5f35] px-6 hover:bg-[#874d29]",
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
	additionalCategories: [
		"Production equipment packages",
		"Heater treaters",
		"Pumping units",
		"Generators & power units",
		"Gas processing equipment",
		"Flowback & well testing equipment",
		"Pipe, tubing, and surplus yard inventory",
		"Valves, fittings, and control systems"
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
	whyPeopleWorkWithPetra: [
		{
			"title": "We understand field reality",
			"description": "We're not guessing what a compressor package is or how it's used. We know how it actually runs in the field."
		},
		{
			"title": "We deal with real buyers",
			"description": "Not tire-kickers. Not \"just curious\" inquiries."
		},
		{
			"title": "We keep deals moving",
			"description": "No ghosting. No endless waiting for replies."
		},
		{
			"title": "We know regional markets",
			"description": "Wyoming, Powder River, Bakken, Rockies—we understand how pricing and demand actually shift here."
		}
	],
	states: [
		"Wyoming oilfields (Powder River, Jonah, Green River Basin)",
		"North Dakota (Bakken)",
		"Colorado energy corridors",
		"Utah & New Mexico producing regions",
		"Montana industrial yards",
		"Regional surplus equipment yards and private sellers"
	]
};
//#endregion
//#region resources/js/Pages/Home.tsx
var Home_exports = /* @__PURE__ */ __exportAll({ default: () => Home });
var { heroImage: heroImage$7, stats, featureItems, categories, additionalCategories, processSteps: processSteps$2, whyPeopleWorkWithPetra, states } = home_default;
var badgeStyleFor = (availability) => availability === "Available" ? "primary" : availability === "Pending" ? "outline" : "solid";
var featuredSpecs = (listing) => [
	["Year", listing.year],
	["Capacity", listing.capacity],
	["Manufacturer", listing.manufacturer],
	["Condition", listing.condition]
].map(([label, value]) => [label, value ?? "—"]).slice(0, 4);
var pageTitle$4 = "Petra | Used Oilfield & Industrial Equipment Brokerage";
var pageDescription$4 = "Petra connects real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, the Bakken, and surrounding producing regions.";
function Home({ canonicalUrl, ogImageUrl, featuredListings }) {
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
			description: pageDescription$4
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$4,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$4
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
				content: pageTitle$4
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$4
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
				content: pageTitle$4
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$4
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
				className: "hero-parallax relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-neutral-950 px-5 py-20 text-center text-white sm:px-10",
				style: {
					backgroundImage: `url('${heroImage$7}')`,
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
								children: "Or trying to find a solid piece of gear without chasing 12 different sellers who don't return calls?"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-5 max-w-2xl text-base font-medium leading-7 text-white/80 sm:text-lg",
								children: "Petra helps you move equipment faster without the runaround. We connect real buyers and sellers of used oilfield and industrial equipment across Wyoming, the Rockies, and surrounding producing regions."
							}),
							/* @__PURE__ */ jsxs("div", {
								className: "mt-12 flex w-full max-w-xs flex-col gap-4",
								children: [/* @__PURE__ */ jsx("a", {
									href: "/equipment",
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
						children: [/* @__PURE__ */ jsxs("div", {
							className: "max-w-xl",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-base font-semibold tracking-[0.08em] text-neutral-600 lg:whitespace-nowrap",
								children: "No auctions. No guessing games. No wasted time."
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-3 text-base leading-7 text-neutral-600",
								children: "Just straight brokerage work between people who actually understand field equipment."
							})]
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
				className: "bg-[#1c1a16] py-28 text-white sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-16 px-5 sm:px-10 lg:grid-cols-12 lg:items-start",
					children: [/* @__PURE__ */ jsx("div", {
						className: "lg:col-span-5",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-white sm:text-5xl",
							children: "Equipment doesn't move itself. And it doesn't sell itself either."
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "lg:col-span-7",
						children: [
							/* @__PURE__ */ jsx("p", {
								className: "text-lg leading-8 text-white/75",
								children: "If you've ever tried to sell a separator, compressor, tank battery, or pump package—you already know:"
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mt-10 space-y-6 border-y border-white/15 py-10",
								children: [
									"Posting online doesn't bring serious buyers",
									"Most \"buyers\" aren't actually ready",
									"And half the time, you're stuck explaining specs over and over again"
								].map((item) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-lg leading-7 text-white/85",
										children: item
									})]
								}, item))
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-10 text-lg leading-8 text-white/75",
								children: "Petra steps in as the middle ground. We take the equipment, get it properly represented, and put it in front of the right people who are actually in the market."
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#f3f1ec] py-28 sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
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
										href: "/equipment",
										children: "Browse Equipment"
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-4 md:grid-cols-4",
							children: categories.map((category) => /* @__PURE__ */ jsxs("a", {
								href: "/equipment",
								className: "group relative h-[500px] cursor-pointer overflow-hidden bg-neutral-950",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-cover grayscale transition-all duration-700 group-hover:scale-110 group-hover:grayscale-0",
										style: {
											backgroundImage: `url('${heroImage$7}')`,
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
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-12 border border-[#dad5cb] bg-white p-8 sm:p-10",
							children: /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-x-10 gap-y-5 sm:grid-cols-2 lg:grid-cols-4",
								children: additionalCategories.map((category) => /* @__PURE__ */ jsxs("div", {
									className: "flex items-start gap-3",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-base leading-7 text-neutral-700",
										children: category
									})]
								}, category))
							})
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-10 max-w-2xl text-center text-lg leading-8 text-neutral-600",
							children: "If it's sitting in a yard collecting dust—we can probably move it."
						})
					]
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
							children: processSteps$2.map((step, index) => /* @__PURE__ */ jsxs("div", {
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
			featuredListings.length > 0 && /* @__PURE__ */ jsx("section", {
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
							href: "/equipment",
							className: "border border-neutral-500 px-8 py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
							children: "View Equipment"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-10 md:grid-cols-3 lg:gap-12",
						children: featuredListings.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "group border border-[#dad5cb] bg-white transition-colors duration-500 hover:border-[#a56437]",
							children: [/* @__PURE__ */ jsxs("div", {
								className: "relative h-72 overflow-hidden bg-black",
								children: [
									/* @__PURE__ */ jsx("div", {
										className: "absolute inset-0 bg-cover grayscale opacity-80 transition-all duration-700 group-hover:scale-105 group-hover:grayscale-0",
										style: { backgroundImage: `url('${item.image_url}')` },
										"aria-hidden": "true"
									}),
									/* @__PURE__ */ jsx("div", {
										className: `absolute left-0 top-0 px-4 py-2 font-heading text-sm font-semibold uppercase tracking-[0.08em] ${badgeStyleFor(item.availability) === "outline" ? "border border-[#a56437] bg-white/90 text-[#a56437]" : badgeStyleFor(item.availability) === "primary" ? "bg-[#a56437] text-white" : "bg-neutral-500 text-white"}`,
										children: item.availability
									}),
									/* @__PURE__ */ jsxs("div", {
										className: "absolute bottom-4 right-4 border border-white/20 bg-black/50 px-2 py-1 font-heading text-sm font-semibold tracking-[0.08em] text-white/80 backdrop-blur-md",
										children: ["ID: ", item.public_id]
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
										children: featuredSpecs(item).map(([label, value], index) => /* @__PURE__ */ jsxs("div", {
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
										href: item.href,
										className: "flex w-full items-center justify-center border border-[#dad5cb] bg-[#f3f1ec] py-4 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
										children: "Request Details"
									})
								]
							})]
						}, item.public_id))
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
								children: [
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Get equipment in front of active buyers." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Price it based on actual market movement, not guesswork." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Handle buyer calls and negotiation." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Move equipment without tying up your team." })]
									})
								]
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-12 text-lg leading-8 text-neutral-600",
								children: "If you've got surplus iron sitting in a yard in Wyoming, North Dakota, or Colorado—we'll help you turn it into capital again."
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
								children: "Most buyers do not need more listings. They need:"
							}),
							/* @__PURE__ */ jsxs("ul", {
								className: "mb-12 space-y-6",
								children: [
									[
										"The right size",
										"The right spec",
										"The right condition",
										"And someone who actually knows where to find it"
									].map((item) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: item })]
									}, item)),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "Tell us what you're trying to source." })]
									}),
									/* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-4",
										children: [/* @__PURE__ */ jsx(FeatureIcon, {
											type: "check",
											className: "mt-0.5 h-5 w-5"
										}), /* @__PURE__ */ jsx("span", { children: "We work our network and come back with real options." })]
									})
								]
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/request-equipment",
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
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsx("div", {
						className: "mb-16 text-center sm:mb-24",
						children: /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Why People Work With Petra"
						})
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-6 md:grid-cols-2",
						children: whyPeopleWorkWithPetra.map((item) => /* @__PURE__ */ jsxs("article", {
							className: "border border-[#dad5cb] bg-white p-8 sm:p-10",
							children: [/* @__PURE__ */ jsx("h3", {
								className: "font-heading text-2xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
								children: item.title
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-5 text-base leading-7 text-neutral-600",
								children: item.description
							})]
						}, item.title))
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
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-10 text-lg leading-8 text-neutral-600",
								children: "If equipment is moving in these areas—we're usually already connected to it."
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
				className: "border-t border-[#dad5cb] bg-white py-28 text-center sm:py-36 lg:py-40",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[900px] px-5 sm:px-10",
					children: [
						/* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Not Sure What Your Equipment Is Worth?"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-8 max-w-3xl text-lg leading-8 text-neutral-600",
							children: "Most people either overprice it and it sits for months, or underprice it and leave money on the table. We help you find the middle ground based on actual market activity—not guesswork or outdated pricing charts."
						}),
						/* @__PURE__ */ jsx("a", {
							href: "/contact",
							className: "mt-12 inline-flex h-16 items-center justify-center bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
							children: "Request Valuation"
						})
					]
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
								href: "/equipment",
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
var industries_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	industries: [
		{
			"title": "Oil and Gas Production",
			"summary": "Production equipment, compression, separation, tank batteries, pump packages, and field assets used across producing basins.",
			"equipment": [
				"Separators",
				"Compressors",
				"Tank batteries",
				"Pump packages"
			]
		},
		{
			"title": "Midstream Operations",
			"summary": "Equipment tied to movement, pressure, processing support, and site infrastructure for oil and gas systems.",
			"equipment": [
				"Compression packages",
				"Piping assets",
				"Support skids",
				"Production handling"
			]
		},
		{
			"title": "Industrial Surplus",
			"summary": "Used industrial equipment and surplus assets that still have practical value for operators, yards, and regional buyers.",
			"equipment": [
				"Surplus packages",
				"Storage assets",
				"Field support",
				"Process equipment"
			]
		},
		{
			"title": "Regional Equipment Yards",
			"summary": "Assets sitting in yards, operator facilities, and surplus channels across Wyoming, the Rockies, and surrounding regions.",
			"equipment": [
				"Idle equipment",
				"Stored assets",
				"Decommissioned units",
				"Ready-to-move packages"
			]
		}
	],
	signals: [
		{
			"title": "Field Use",
			"description": "Petra evaluates what the equipment was built to do, where it has been used, and whether that use case still matches buyer demand."
		},
		{
			"title": "Regional Demand",
			"description": "Equipment fit changes by basin, timing, logistics, and operator needs. Petra keeps regional movement part of the conversation."
		},
		{
			"title": "Asset Readiness",
			"description": "Condition, documentation, access, and transportation all affect whether an equipment opportunity is actually workable."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Which industries does Petra serve?",
			"answer": "Petra focuses on used oilfield and industrial equipment for oil and gas production, midstream operations, industrial surplus, and regional equipment yards."
		},
		{
			"question": "Does Petra work outside one basin?",
			"answer": "Yes. Petra works across Wyoming, the Powder River, the Rockies, the Bakken, North Dakota, Colorado, Utah, New Mexico, Montana, and surrounding producing regions."
		},
		{
			"question": "Why does industry context matter?",
			"answer": "The same piece of equipment can have different value depending on field use, location, condition, buyer demand, documents, and logistics."
		}
	]
};
//#endregion
//#region resources/js/Pages/Industries.tsx
var Industries_exports = /* @__PURE__ */ __exportAll({ default: () => Industries });
var { heroImage: heroImage$5, industries, signals, regions: regions$4, faqs: faqs$18 } = industries_default;
var pageTitle$3 = "Industries | Petra";
var pageDescription$3 = "Petra works across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards.";
var docIndustries = [
	"Oil & Gas Production",
	"Midstream Operations",
	"Gas Processing",
	"Drilling Contractors",
	"Energy Services Companies",
	"Industrial Yards",
	"Power Generation"
];
function Industries({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "CollectionPage",
			"@id": `${canonicalUrl}#industries`,
			name: "Industries",
			url: canonicalUrl,
			description: pageDescription$3,
			about: [
				"Wyoming oilfields",
				"North Dakota Bakken",
				"Colorado energy corridors",
				"Utah and New Mexico producing regions",
				"Montana industrial yards",
				"Regional surplus equipment yards and private sellers"
			],
			isPartOf: {
				"@type": "WebSite",
				name: "Petra",
				url: canonicalUrl.replace(/\/industries$/, "")
			}
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/industries$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Industries",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$3,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$3
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
				content: pageTitle$3
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$3
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
				content: "Oilfield and industrial equipment yard represented by Petra."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$3
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$3
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
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Industries"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "We work across producing and industrial regions including Wyoming, the Bakken, Colorado energy corridors, Utah, New Mexico, Montana, and regional surplus equipment yards."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "View Equipment"
							}), /* @__PURE__ */ jsx("a", {
								href: "/services",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "View Services"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mx-auto mb-9 max-w-3xl text-center",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]",
								children: "Markets Served"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl",
								children: "Industries Petra Works In"
							})]
						}),
						/* @__PURE__ */ jsx("div", {
							className: "grid grid-cols-1 gap-px bg-white/15 sm:grid-cols-2 lg:grid-cols-4",
							children: docIndustries.map((industry) => /* @__PURE__ */ jsxs("article", {
								className: "bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]",
								children: [/* @__PURE__ */ jsx("div", { className: "mb-5 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h3", {
									className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white",
									children: industry
								})]
							}, industry))
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mx-auto mt-9 max-w-3xl text-center text-lg leading-8 text-white/75",
							children: "We understand how equipment is actually used in the field—not just how it's listed."
						})
					]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Where We Operate"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "Regional Markets Petra Knows"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg leading-8 text-neutral-600",
								children: "If equipment is moving in these areas—we're usually already connected to it."
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsx("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
								children: [
									"Wyoming oilfields (Powder River, Jonah, Green River Basin)",
									"North Dakota (Bakken)",
									"Colorado energy corridors",
									"Utah & New Mexico producing regions",
									"Montana industrial yards",
									"Regional surplus equipment yards and private sellers"
								].map((region) => /* @__PURE__ */ jsxs("article", {
									className: "flex min-h-24 items-start gap-4 bg-white p-5",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-1 h-5 w-5 shrink-0"
									}), /* @__PURE__ */ jsx("h3", {
										className: "font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950",
										children: region
									})]
								}, region))
							})
						})
					})]
				})
			})
		]
	})] });
}
var legal_pages_default = {
	privacy: {
		"title": "Privacy Policy",
		"metaTitle": "Privacy Policy | Petra",
		"description": "Petra's privacy policy for visitors using the public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Privacy",
		"intro": "This policy explains how Petra handles basic information connected to public website inquiries and equipment brokerage conversations.",
		"sections": [
			{
				"heading": "Information You Provide",
				"body": "You may provide contact details, equipment descriptions, location notes, photos, documents, or request details when discussing equipment brokerage, sourcing, or sale opportunities."
			},
			{
				"heading": "How Information Is Used",
				"body": "Petra uses submitted information to review equipment opportunities, respond to buyer or seller requests, assess market fit, coordinate brokerage conversations, and improve public website content."
			},
			{
				"heading": "Operational Sharing",
				"body": "Equipment details may be shared with relevant buyers, sellers, logistics contacts, or service providers when needed to evaluate or move a potential transaction."
			},
			{
				"heading": "Retention",
				"body": "Information may be retained when it supports active brokerage conversations, recordkeeping, business operations, or future equipment sourcing needs."
			}
		]
	},
	terms: {
		"title": "Terms of Service",
		"metaTitle": "Terms of Service | Petra",
		"description": "Terms for using Petra's public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Terms",
		"intro": "These terms cover general use of Petra's public website and equipment brokerage information.",
		"sections": [
			{
				"heading": "Website Use",
				"body": "The website is provided for general information about Petra's used oilfield and industrial equipment brokerage work. You agree not to misuse the site or interfere with its operation."
			},
			{
				"heading": "Equipment Information",
				"body": "Equipment descriptions, availability, condition, specifications, and regional notes may change. Public website content should not be treated as a final offer, warranty, or transaction document."
			},
			{
				"heading": "Brokerage Conversations",
				"body": "Any transaction, sourcing request, sale discussion, inspection, logistics plan, or documentation requirement must be confirmed through direct business communication."
			},
			{
				"heading": "No Guaranteed Outcome",
				"body": "Petra may review equipment opportunities and buyer requests, but no sale, purchase, valuation, sourcing result, or timeline is guaranteed through website use."
			}
		]
	},
	cookies: {
		"title": "Cookie Policy",
		"metaTitle": "Cookie Policy | Petra",
		"description": "Cookie policy for Petra's public used oilfield and industrial equipment brokerage website.",
		"eyebrow": "Cookies",
		"intro": "This page explains the basic role cookies and similar browser technologies may play on Petra's public website.",
		"sections": [
			{
				"heading": "Site Function",
				"body": "Cookies or similar storage may support basic website functionality, preferences, security, analytics, or performance measurement."
			},
			{
				"heading": "Analytics and Performance",
				"body": "Petra may review aggregated website activity to understand page usage, improve content, and keep public equipment brokerage pages useful."
			},
			{
				"heading": "Browser Controls",
				"body": "Most browsers allow you to block, delete, or limit cookies. Some site features may not work as expected if browser storage is disabled."
			},
			{
				"heading": "Policy Updates",
				"body": "This policy may be updated as website tools, analytics practices, or public site features change."
			}
		]
	},
	disclaimer: {
		"title": "Disclaimer",
		"metaTitle": "Disclaimer | Petra",
		"description": "Website disclaimer for Petra's used oilfield and industrial equipment brokerage information.",
		"eyebrow": "Disclaimer",
		"intro": "This disclaimer explains the limits of public website information about equipment, brokerage, sourcing, and market context.",
		"sections": [
			{
				"heading": "General Information",
				"body": "Website content is provided for general informational purposes and does not replace direct review, inspection, documentation, or transaction-specific communication."
			},
			{
				"heading": "Equipment Condition",
				"body": "Condition, specifications, availability, location, and suitability must be verified before any buyer, seller, or operator relies on an equipment opportunity."
			},
			{
				"heading": "Market Context",
				"body": "Market movement, buyer demand, sourcing availability, and regional fit can change quickly. Petra does not guarantee pricing, liquidity, or transaction outcomes based on public content."
			},
			{
				"heading": "Third-Party Details",
				"body": "Some equipment information may originate from sellers, operators, yards, or other third parties and must be confirmed before use in a transaction."
			}
		]
	}
};
//#endregion
//#region resources/js/Pages/LegalPage.tsx
var LegalPage_exports = /* @__PURE__ */ __exportAll({ default: () => LegalPage });
function LegalPage({ pageKey, canonicalUrl }) {
	const page = legal_pages_default[pageKey];
	const structuredData = {
		"@context": "https://schema.org",
		"@type": "WebPage",
		name: page.title,
		url: canonicalUrl,
		description: page.description
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: page.metaTitle,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: page.description
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: "noindex, follow"
			}),
			/* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			})
		]
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [/* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsxs("div", {
				className: "mx-auto max-w-[960px] px-5 py-20 sm:px-10 lg:py-24",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: page.eyebrow
					}),
					/* @__PURE__ */ jsx("h1", {
						className: "mt-5 font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem]",
						children: page.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
						children: page.intro
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 font-heading text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500",
						children: "Last updated July 8, 2026"
					})
				]
			})
		}), /* @__PURE__ */ jsx("section", {
			className: "py-16 sm:py-20",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto grid max-w-[960px] grid-cols-1 gap-px bg-[#dad5cb] px-5 sm:px-10",
				children: page.sections.map((section) => /* @__PURE__ */ jsxs("article", {
					className: "bg-white p-7 sm:p-8",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: section.heading
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-4 text-base leading-7 text-neutral-600",
						children: section.body
					})]
				}, section.heading))
			})
		})]
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/BuyerQuotes.tsx
var BuyerQuotes_exports = /* @__PURE__ */ __exportAll({ default: () => BuyerQuotes });
function BuyerQuotes({ portal, quotes }) {
	const { status } = usePage().props;
	const [activeId, setActiveId] = useState(null);
	const active = quotes.find((quote) => quote.id === activeId) ?? null;
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Quotes | Buyer Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "Quotes",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ jsx(PortalPageHeader, {
				eyebrow: "Quote Requests",
				title: "Your Quotes",
				description: quotes.length === 0 ? "Request a quote from any listing to start one." : `${quotes.length} ${quotes.length === 1 ? "quote" : "quotes"} · request more from any listing.`,
				actions: /* @__PURE__ */ jsx(Link, {
					href: "/equipment",
					className: portalHeaderActionClass,
					children: "Browse Equipment"
				})
			}), quotes.length === 0 ? /* @__PURE__ */ jsx("article", {
				className: "rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm",
				children: "You haven’t requested any quotes yet. Open a listing and use “Request Quote” to ask Petra about availability and pricing — your requests will appear here."
			}) : /* @__PURE__ */ jsx(DataTable, {
				columns: QUOTE_COLUMNS,
				rows: quotes,
				rowKey: (quote) => quote.id,
				onRowClick: (quote) => setActiveId(quote.id),
				rowLabel: (quote) => `View your quote request for ${quote.equipment_name}`,
				caption: "Quotes you have requested from Petra"
			})]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: active?.listing_public_id ?? "Quote request",
			title: active?.equipment_name ?? "",
			children: active && /* @__PURE__ */ jsxs("dl", {
				className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: "Listing"
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-1",
						children: active.listing_href && active.listing_public_id ? /* @__PURE__ */ jsx(Link, {
							href: active.listing_href,
							className: "focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline",
							children: active.listing_public_id
						}) : /* @__PURE__ */ jsx("span", {
							className: "text-neutral-500",
							children: "No longer listed"
						})
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: "Status"
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-1",
						children: /* @__PURE__ */ jsx(StatusBadge$3, { label: active.status_label })
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: "Requested"
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-1 text-neutral-700",
						children: active.created_at ?? "Not available"
					})] }),
					active.note && /* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "What you sent"
						}), /* @__PURE__ */ jsx("dd", {
							className: "mt-2 whitespace-pre-line rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3 text-sm leading-6 text-neutral-700",
							children: active.note
						})]
					})
				]
			})
		})]
	})] });
}
var QUOTE_COLUMNS = [
	{
		key: "equipment",
		header: "Equipment",
		cell: (quote) => /* @__PURE__ */ jsx(CellStack, { primary: /* @__PURE__ */ jsx("span", {
			className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
			children: quote.equipment_name
		}) })
	},
	{
		key: "listing",
		header: "Listing",
		hideBelow: "md",
		cell: (quote) => quote.listing_href && quote.listing_public_id ? /* @__PURE__ */ jsx(Link, {
			href: quote.listing_href,
			className: "focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline",
			children: quote.listing_public_id
		}) : /* @__PURE__ */ jsx("span", {
			className: "text-neutral-500",
			children: "No longer listed"
		})
	},
	{
		key: "requested",
		header: "Requested",
		hideBelow: "lg",
		cell: (quote) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: quote.created_at ?? "—"
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (quote) => /* @__PURE__ */ jsx(StatusBadge$3, { label: quote.status_label })
	}
];
function StatusBadge$3({ label }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex h-8 items-center rounded-full border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]",
		children: label
	});
}
//#endregion
//#region resources/js/Pages/Portal/BuyerRequests.tsx
var BuyerRequests_exports = /* @__PURE__ */ __exportAll({ default: () => BuyerRequests });
var monthFormatter = new Intl.DateTimeFormat("en-US", {
	month: "long",
	year: "numeric"
});
var dateFormatter = new Intl.DateTimeFormat("en-US", {
	month: "short",
	day: "numeric",
	year: "numeric"
});
var weekdayLabels = [
	"Su",
	"Mo",
	"Tu",
	"We",
	"Th",
	"Fr",
	"Sa"
];
function BuyerRequests({ portal, requests }) {
	const { status } = usePage().props;
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [activeId, setActiveId] = useState(null);
	const active = requests.find((request) => request.id === activeId) ?? null;
	const [timelineRange, setTimelineRange] = useState({
		start: null,
		end: null
	});
	const form = useForm({
		equipment_type: "",
		specifications: "",
		budget_range: "",
		location_preference: "",
		timeline: ""
	});
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	function submit(event) {
		event.preventDefault();
		if (!timelineRange.start || !timelineRange.end) {
			form.setError("timeline", "Select a start and end date.");
			return;
		}
		form.post("/buyer/requests", {
			preserveScroll: true,
			onSuccess: () => {
				form.reset();
				setTimelineRange({
					start: null,
					end: null
				});
				setIsFormOpen(false);
			}
		});
	}
	function updateTimeline(nextRange) {
		setTimelineRange(nextRange);
		form.setData("timeline", nextRange.start && nextRange.end ? formatDateRange(nextRange.start, nextRange.end) : "");
		form.clearErrors("timeline");
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "My Requests | Buyer Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "My Requests",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [
				/* @__PURE__ */ jsx(PortalPageHeader, {
					eyebrow: "Equipment Requests",
					title: "Your Requests",
					description: requests.length === 0 ? "Ask Petra to source equipment for you." : `${requests.length} ${requests.length === 1 ? "request" : "requests"} · track review status here.`,
					actions: /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setIsFormOpen(true),
						className: portalHeaderActionClass,
						children: "Request Equipment"
					})
				}),
				/* @__PURE__ */ jsx(SlideOver, {
					open: isFormOpen,
					onClose: () => setIsFormOpen(false),
					eyebrow: "Request Equipment",
					title: "What To Include",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field$3, {
								id: "equipment_type",
								label: "Equipment type",
								error: form.errors.equipment_type,
								children: /* @__PURE__ */ jsx("input", {
									id: "equipment_type",
									value: form.data.equipment_type,
									onChange: (event) => form.setData("equipment_type", event.target.value),
									className: "portal-input",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$3, {
								id: "budget_range",
								label: "Budget range",
								error: form.errors.budget_range,
								children: /* @__PURE__ */ jsx("input", {
									id: "budget_range",
									value: form.data.budget_range,
									onChange: (event) => form.setData("budget_range", formatBudgetInput(event.target.value)),
									className: "portal-input",
									inputMode: "numeric",
									pattern: "[0-9,]*",
									placeholder: "40,000",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$3, {
								id: "location_preference",
								label: "Location preference",
								error: form.errors.location_preference,
								children: /* @__PURE__ */ jsx("input", {
									id: "location_preference",
									value: form.data.location_preference,
									onChange: (event) => form.setData("location_preference", event.target.value),
									className: "portal-input",
									required: true
								})
							}),
							/* @__PURE__ */ jsx(Field$3, {
								id: "timeline_start",
								label: "Timeline",
								error: form.errors.timeline,
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx(DateRangePicker, {
									id: "timeline_start",
									value: timelineRange,
									onChange: updateTimeline
								})
							}),
							/* @__PURE__ */ jsx(Field$3, {
								id: "specifications",
								label: "Specifications optional",
								error: form.errors.specifications,
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx("textarea", {
									id: "specifications",
									value: form.data.specifications,
									onChange: (event) => form.setData("specifications", event.target.value),
									className: "portal-input min-h-28 py-3"
								})
							}),
							/* @__PURE__ */ jsx("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: form.processing,
									className: "button-press focus-copper inline-flex h-12 items-center justify-center rounded-lg bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
									children: form.processing ? "Submitting" : "Submit Request"
								})
							})
						]
					})
				}),
				requests.length === 0 ? /* @__PURE__ */ jsx("article", {
					className: "rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm",
					children: "Submitted equipment requests will appear here."
				}) : /* @__PURE__ */ jsx(DataTable, {
					columns: REQUEST_COLUMNS,
					rows: requests,
					rowKey: (request) => request.id,
					onRowClick: (request) => setActiveId(request.id),
					rowLabel: (request) => `View your request for ${request.equipment_type}`,
					caption: "Equipment you have asked Petra to source"
				})
			]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: "Equipment request",
			title: active?.equipment_type ?? "",
			children: active && /* @__PURE__ */ jsxs("dl", {
				className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
				children: [
					/* @__PURE__ */ jsx(Detail$2, {
						label: "Status",
						value: active.status_label
					}),
					/* @__PURE__ */ jsx(Detail$2, {
						label: "Submitted",
						value: active.created_at
					}),
					/* @__PURE__ */ jsx(Detail$2, {
						label: "Budget range",
						value: active.budget_range
					}),
					/* @__PURE__ */ jsx(Detail$2, {
						label: "Location preference",
						value: active.location_preference
					}),
					/* @__PURE__ */ jsx(Detail$2, {
						label: "Timeline",
						value: active.timeline
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "sm:col-span-2",
						children: [/* @__PURE__ */ jsx("dt", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Specifications"
						}), /* @__PURE__ */ jsx("dd", {
							className: "mt-1 whitespace-pre-line text-neutral-700",
							children: active.specifications || "Not provided"
						})]
					})
				]
			})
		})]
	})] });
}
function DateRangePicker({ id, value, onChange }) {
	const [visibleMonth, setVisibleMonth] = useState(() => startOfMonth(/* @__PURE__ */ new Date()));
	const months = [visibleMonth, addMonths(visibleMonth, 1)];
	function selectDate(day) {
		const selectedDay = stripTime(day);
		if (!value.start || value.end || selectedDay.getTime() < value.start.getTime()) {
			onChange({
				start: selectedDay,
				end: null
			});
			return;
		}
		onChange({
			start: value.start,
			end: selectedDay
		});
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "rounded-lg border border-[#dad5cb] bg-white",
		children: [
			/* @__PURE__ */ jsxs("div", {
				className: "grid gap-3 border-b border-[#dad5cb] bg-[#fbfaf8] p-3 sm:grid-cols-2",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-[#dad5cb] bg-white px-3 py-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: "Start date"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-medium text-neutral-950",
						children: value.start ? formatDate(value.start) : "Select date"
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "rounded-lg border border-[#dad5cb] bg-white px-3 py-2",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: "End date"
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-1 text-sm font-medium text-neutral-950",
						children: value.end ? formatDate(value.end) : "Select date"
					})]
				})]
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "flex items-center justify-between border-b border-[#dad5cb] px-3 py-2",
				children: [
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setVisibleMonth((current) => addMonths(current, -1)),
						className: "button-press focus-copper inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dad5cb] font-heading text-lg text-neutral-950 hover:bg-neutral-950 hover:text-white",
						"aria-label": "Previous month",
						children: "<"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => onChange({
							start: null,
							end: null
						}),
						className: "focus-copper font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline",
						children: "Clear"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => setVisibleMonth((current) => addMonths(current, 1)),
						className: "button-press focus-copper inline-flex h-9 w-9 items-center justify-center rounded-lg border border-[#dad5cb] font-heading text-lg text-neutral-950 hover:bg-neutral-950 hover:text-white",
						"aria-label": "Next month",
						children: ">"
					})
				]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-4 p-3 sm:grid-cols-2",
				children: months.map((month, monthIndex) => /* @__PURE__ */ jsx(MonthCalendar, {
					id: monthIndex === 0 ? id : void 0,
					month,
					value,
					onSelect: selectDate
				}, month.toISOString()))
			})
		]
	});
}
function MonthCalendar({ id, month, value, onSelect }) {
	const days = getCalendarDays(month);
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h3", {
		className: "text-center font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950",
		children: monthFormatter.format(month)
	}), /* @__PURE__ */ jsxs("div", {
		className: "mt-3 grid grid-cols-7 gap-1 text-center",
		children: [weekdayLabels.map((weekday) => /* @__PURE__ */ jsx("span", {
			className: "py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
			children: weekday
		}, weekday)), days.map((day, index) => day ? /* @__PURE__ */ jsx("button", {
			id: id && day.getDate() === 1 ? id : void 0,
			type: "button",
			onClick: () => onSelect(day),
			"aria-pressed": isSelected(day, value),
			"aria-label": formatDate(day),
			className: dayButtonClass(day, value),
			children: day.getDate()
		}, day.toISOString()) : /* @__PURE__ */ jsx("span", { "aria-hidden": "true" }, `blank-${index}`))]
	})] });
}
function dayButtonClass(day, value) {
	const baseClass = "focus-copper grid aspect-square min-h-9 place-items-center rounded-lg border font-heading text-sm font-semibold transition-colors";
	if (isRangeBoundary(day, value)) return `${baseClass} border-neutral-950 bg-neutral-950 text-white`;
	if (isWithinRange(day, value)) return `${baseClass} border-[#eadfd4] bg-[#f1e7dc] text-neutral-950`;
	return `${baseClass} border-transparent text-neutral-700 hover:border-[#a56437] hover:bg-[#fbfaf8]`;
}
function Field$3({ id, label, error, className = "", children }) {
	return /* @__PURE__ */ jsxs("div", {
		className: `grid gap-2 ${className}`,
		children: [
			/* @__PURE__ */ jsx("label", {
				htmlFor: id,
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
/**
* Specifications is free text and can run long, so it is deliberately not a column —
* it lives in the slide-over where it has room to wrap.
*/
var REQUEST_COLUMNS = [
	{
		key: "equipment",
		header: "Equipment",
		cell: (request) => /* @__PURE__ */ jsx(CellStack, {
			primary: /* @__PURE__ */ jsx("span", {
				className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
				children: request.equipment_type
			}),
			secondary: request.location_preference
		})
	},
	{
		key: "budget",
		header: "Budget",
		hideBelow: "md",
		align: "right",
		cell: (request) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: request.budget_range || "—"
		})
	},
	{
		key: "timeline",
		header: "Timeline",
		hideBelow: "lg",
		cell: (request) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: request.timeline || "—"
		})
	},
	{
		key: "submitted",
		header: "Submitted",
		hideBelow: "xl",
		cell: (request) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: request.created_at ?? "—"
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (request) => /* @__PURE__ */ jsx(StatusBadge$2, { label: request.status_label })
	}
];
function Detail$2({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "mt-1 text-neutral-700",
		children: value || "Not provided"
	})] });
}
function StatusBadge$2({ label }) {
	return /* @__PURE__ */ jsx("span", {
		className: "inline-flex h-8 items-center rounded-full border border-[#dad5cb] bg-[#f8f8f6] px-3 font-heading text-sm font-semibold uppercase tracking-[0.12em] text-[#a56437]",
		children: label
	});
}
function formatBudgetInput(value) {
	return value.replace(/\D/g, "").replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
function formatDate(date) {
	return dateFormatter.format(date);
}
function formatDateRange(start, end) {
	return `${formatDate(start)} - ${formatDate(end)}`;
}
function stripTime(date) {
	return new Date(date.getFullYear(), date.getMonth(), date.getDate());
}
function startOfMonth(date) {
	return new Date(date.getFullYear(), date.getMonth(), 1);
}
function addMonths(date, months) {
	return new Date(date.getFullYear(), date.getMonth() + months, 1);
}
function getCalendarDays(month) {
	const firstDay = startOfMonth(month);
	const daysInMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0).getDate();
	const blanks = Array.from({ length: firstDay.getDay() }).fill(null);
	const days = Array.from({ length: daysInMonth }, (_, index) => new Date(month.getFullYear(), month.getMonth(), index + 1));
	return [...blanks, ...days];
}
function isSameDay(first, second) {
	return Boolean(first && second && first.getTime() === second.getTime());
}
function isSelected(day, value) {
	return isRangeBoundary(day, value) || isWithinRange(day, value);
}
function isRangeBoundary(day, value) {
	return isSameDay(day, value.start) || isSameDay(day, value.end);
}
function isWithinRange(day, value) {
	if (!value.start || !value.end) return false;
	const timestamp = day.getTime();
	return timestamp > value.start.getTime() && timestamp < value.end.getTime();
}
//#endregion
//#region resources/js/Pages/Portal/Dashboard.tsx
var Dashboard_exports = /* @__PURE__ */ __exportAll({ default: () => Dashboard });
function Dashboard({ portal }) {
	const summaryCards = portal.userType === "seller" ? [
		{
			label: "My Listings",
			state: "Live",
			description: "Submit equipment and track review status from My Listings."
		},
		{
			label: "Quotes",
			state: "Soon",
			description: "Quote workflows are reserved for a later phase."
		},
		{
			label: "Messages",
			state: "Live",
			description: "Message your Petra broker about any of your equipment."
		}
	] : [
		{
			label: "My Requests",
			state: "Live",
			description: "Submit equipment requests and track review status from My Requests."
		},
		{
			label: "Saved Equipment",
			state: "Soon",
			description: "The marketplace watchlist is reserved for a later phase."
		},
		{
			label: "Quotes",
			state: "Live",
			description: "Track quotes you requested from listings and their review status from Quotes."
		}
	];
	const subtitle = portal.userType === "seller" ? "Track your listings and portal activity" : "Track your requests and portal activity";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${portal.roleLabel} Dashboard` }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: `${portal.roleLabel} Dashboard`,
		eyebrow: subtitle,
		children: /* @__PURE__ */ jsxs("section", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ jsxs("article", {
				className: "rounded-2xl border border-[#dad5cb] bg-white p-7 shadow-sm sm:p-8",
				children: [
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
						children: "Overview"
					}),
					/* @__PURE__ */ jsx("h2", {
						className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: "Activity Summary"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-5 max-w-3xl text-base leading-7 text-neutral-600",
						children: portal.summary
					})
				]
			}), /* @__PURE__ */ jsx("div", {
				className: "grid grid-cols-1 gap-4 md:grid-cols-3",
				children: summaryCards.map((card) => /* @__PURE__ */ jsxs("article", {
					className: "interactive-lift rounded-2xl border border-[#dad5cb] bg-white p-6 shadow-sm",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "mb-5 flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ jsx("span", {
								className: "flex h-9 w-9 items-center justify-center rounded-xl bg-[#f4ece4] text-[#a56437]",
								children: /* @__PURE__ */ jsx("span", { className: "h-2 w-2 rounded-full bg-[#a56437]" })
							}), /* @__PURE__ */ jsx("span", {
								className: `rounded-full border px-2.5 py-1 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${card.state === "Live" ? "border-emerald-200 bg-emerald-50 text-emerald-700" : "border-neutral-200 bg-neutral-50 text-neutral-500"}`,
								children: card.state
							})]
						}),
						/* @__PURE__ */ jsx("h3", {
							className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: card.label
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-4 text-sm leading-6 text-neutral-600",
							children: card.description
						})
					]
				}, card.label))
			})]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/Messages.tsx
var Messages_exports = /* @__PURE__ */ __exportAll({ default: () => Messages });
var THREAD_POLL_MS = 2e4;
/**
* The customer side of messaging, for both the buyer and seller portals.
*
* List and conversation are two URLs rather than client-side view state, which is
* what makes the mobile split work: the list is its own screen, opening a thread is
* a navigation, and Back is the browser's own. On desktop both panes show at once.
*/
function Messages({ portal, threads, thread, messages }) {
	const { status } = usePage().props;
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	const threadId = thread?.id ?? null;
	/**
	* Refresh the open conversation every 20s.
	*
	* Partial reload of just the thread props, so a poll never re-fetches the whole
	* page. Paused while the tab is hidden — a backgrounded tab polling every 20s is
	* pure waste — and fired once on return so the reader is never looking at a stale
	* conversation while the tab is in front of them.
	*/
	useEffect(() => {
		if (threadId === null) return;
		function refresh() {
			if (document.hidden) return;
			router.reload({
				only: [
					"thread",
					"messages",
					"threads",
					"unreadMessageThreads"
				],
				onCancelToken: (token) => registerPollCancel(token.cancel),
				onFinish: () => registerPollCancel(null)
			});
		}
		const timer = window.setInterval(refresh, THREAD_POLL_MS);
		document.addEventListener("visibilitychange", refresh);
		return () => {
			window.clearInterval(timer);
			document.removeEventListener("visibilitychange", refresh);
		};
	}, [threadId]);
	/**
	* Mark read when messages arrive while the thread is already open. Opening a
	* thread is already marked server-side by the show() action, so this covers only
	* the polling case.
	*/
	const markRead = useCallback(() => {
		if (threadId === null) return;
		router.post(`/${portal.userType}/messages/${threadId}/read`, {}, {
			preserveScroll: true,
			preserveState: true,
			only: ["threads", "unreadMessageThreads"]
		});
	}, [portal.userType, threadId]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Messages | Petra Portal" }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: "Messages",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ jsx(PortalPageHeader, {
				eyebrow: "Conversations",
				title: "Messages",
				description: "Talk to your Petra broker about your equipment."
			}), threads.length === 0 ? /* @__PURE__ */ jsx("article", {
				className: "rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm",
				children: "No messages yet — conversations with your broker about your equipment will appear here."
			}) : /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 lg:grid-cols-[minmax(0,22rem)_minmax(0,1fr)]",
				children: [/* @__PURE__ */ jsx("div", {
					className: `min-w-0 ${thread ? "hidden lg:block" : "block"}`,
					children: /* @__PURE__ */ jsx(ThreadList, {
						threads,
						activeId: threadId
					})
				}), thread && messages ? /* @__PURE__ */ jsxs("section", {
					className: "flex min-h-[26rem] flex-col overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f9f7f3] shadow-sm lg:h-[calc(100dvh-15rem)]",
					children: [
						/* @__PURE__ */ jsxs("header", {
							className: "grid gap-0.5 border-b border-[#ece7dd] bg-white px-4 py-2.5 sm:px-5",
							children: [
								/* @__PURE__ */ jsx(Link, {
									href: `/${portal.userType}/messages`,
									className: "focus-copper w-fit font-heading text-xs font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline lg:hidden",
									children: "← All messages"
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ jsx("h2", {
											className: "font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950",
											children: thread.subjectTitle
										}),
										thread.context?.statusLabel && /* @__PURE__ */ jsx(StatusBadge$5, {
											label: thread.context.statusLabel,
											tone: thread.context.statusTone
										}),
										thread.isClosed && /* @__PURE__ */ jsx(StatusBadge$5, {
											label: "Closed",
											tone: "muted"
										})
									]
								}),
								thread.context?.href && /* @__PURE__ */ jsxs(Link, {
									href: thread.context.href,
									className: "focus-copper w-fit text-sm text-[#a56437] underline-offset-4 hover:underline",
									children: ["View ", thread.subjectTypeLabel.toLowerCase()]
								})
							]
						}),
						/* @__PURE__ */ jsx(MessageThread, {
							page: messages,
							onNewMessages: markRead
						}),
						/* @__PURE__ */ jsx(MessageComposer, {
							action: `/${portal.userType}/messages/${thread.id}/messages`,
							placeholder: "Write a message to Petra…"
						})
					]
				}) : /* @__PURE__ */ jsx("section", {
					className: "hidden items-center justify-center rounded-xl border border-dashed border-[#dad5cb] bg-white p-10 text-center text-sm text-neutral-500 lg:flex",
					children: "Select a conversation to read it."
				})]
			})]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/Placeholder.tsx
var Placeholder_exports = /* @__PURE__ */ __exportAll({ default: () => Placeholder });
var sectionLabels = {
	"saved-equipment": "Saved Equipment",
	quotes: "Quotes",
	offers: "Offers",
	documents: "Documents"
};
function Placeholder({ portal, section }) {
	const title = sectionLabels[section] ?? "Coming Soon";
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${title} | ${portal.roleLabel} Portal` }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title,
		children: /* @__PURE__ */ jsxs("article", {
			className: "rounded-xl border border-[#dad5cb] bg-white p-7 shadow-sm sm:p-8",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
					children: "Coming Soon"
				}),
				/* @__PURE__ */ jsxs("h2", {
					className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: [title, " is a later phase"]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-5 max-w-3xl text-base leading-7 text-neutral-600",
					children: "The sitemap names this section, but it does not yet define the underlying object model, workflow states, or permissions. This pass only reserves the route and navigation entry."
				}),
				section === "saved-equipment" && /* @__PURE__ */ jsxs("p", {
					className: "mt-4 max-w-3xl text-base leading-7 text-neutral-600",
					children: [
						"For ",
						portal.roleLabel.toLowerCase(),
						" accounts, the saved-equipment behavior still needs a product decision before data is wired."
					]
				})
			]
		})
	})] });
}
//#endregion
//#region resources/js/Pages/Portal/Profile.tsx
var Profile_exports = /* @__PURE__ */ __exportAll({ default: () => Profile });
function Profile({ portal }) {
	const { auth, status } = usePage().props;
	const user = auth.user;
	const profileForm = useForm({
		name: user?.name ?? "",
		email: user?.email ?? "",
		phone: user?.phone ?? "",
		company_name: user?.company_name ?? ""
	});
	const passwordForm = useForm({
		current_password: "",
		password: "",
		password_confirmation: ""
	});
	function updateProfile(event) {
		event.preventDefault();
		profileForm.patch(`/${portal.userType}/profile`, { preserveScroll: true });
	}
	function updatePassword(event) {
		event.preventDefault();
		passwordForm.put(`/${portal.userType}/profile/password`, {
			preserveScroll: true,
			onSuccess: () => passwordForm.reset()
		});
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Profile" }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: "Profile",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [
				status && /* @__PURE__ */ jsx("div", {
					className: "border border-[#a56437] bg-white p-4 text-base leading-7 text-neutral-700",
					children: status
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: updateProfile,
					className: "grid gap-5 rounded-xl border border-[#dad5cb] bg-white p-7 shadow-sm sm:grid-cols-2 sm:p-8",
					children: [
						/* @__PURE__ */ jsxs("div", {
							className: "sm:col-span-2",
							children: [/* @__PURE__ */ jsx("span", {
								className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Account"
							}), /* @__PURE__ */ jsx("h2", {
								className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
								children: "Contact Details"
							})]
						}),
						/* @__PURE__ */ jsx(Field$2, {
							label: "Name",
							error: profileForm.errors.name,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.name,
								onChange: (event) => profileForm.setData("name", event.target.value),
								className: "portal-input",
								autoComplete: "name",
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field$2, {
							label: "Email",
							error: profileForm.errors.email,
							children: /* @__PURE__ */ jsx("input", {
								type: "email",
								value: profileForm.data.email,
								onChange: (event) => profileForm.setData("email", event.target.value),
								className: "portal-input",
								autoComplete: "email",
								required: true
							})
						}),
						/* @__PURE__ */ jsx(Field$2, {
							label: "Phone",
							error: profileForm.errors.phone,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.phone,
								onChange: (event) => profileForm.setData("phone", event.target.value),
								className: "portal-input",
								autoComplete: "tel"
							})
						}),
						/* @__PURE__ */ jsx(Field$2, {
							label: "Company",
							error: profileForm.errors.company_name,
							children: /* @__PURE__ */ jsx("input", {
								value: profileForm.data.company_name,
								onChange: (event) => profileForm.setData("company_name", event.target.value),
								className: "portal-input",
								autoComplete: "organization"
							})
						}),
						/* @__PURE__ */ jsx(Field$2, {
							label: "Role",
							children: /* @__PURE__ */ jsx("input", {
								value: user?.user_type_label ?? portal.roleLabel,
								className: "portal-input bg-[#f3f1ec] text-neutral-600",
								readOnly: true
							})
						}),
						/* @__PURE__ */ jsx("div", {
							className: "self-end",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: profileForm.processing,
								className: "button-press focus-copper inline-flex h-12 items-center justify-center rounded-lg bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: profileForm.processing ? "Saving" : "Save profile"
							})
						})
					]
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: updatePassword,
					className: "grid gap-5 rounded-xl border border-[#dad5cb] bg-white p-7 shadow-sm sm:p-8",
					children: [
						/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Security"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-4 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
							children: "Change Password"
						})] }),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-5 sm:grid-cols-3",
							children: [
								/* @__PURE__ */ jsx(Field$2, {
									label: "Current password",
									error: passwordForm.errors.current_password,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.current_password,
										onChange: (event) => passwordForm.setData("current_password", event.target.value),
										className: "portal-input",
										autoComplete: "current-password",
										required: true
									})
								}),
								/* @__PURE__ */ jsx(Field$2, {
									label: "New password",
									error: passwordForm.errors.password,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.password,
										onChange: (event) => passwordForm.setData("password", event.target.value),
										className: "portal-input",
										autoComplete: "new-password",
										required: true
									})
								}),
								/* @__PURE__ */ jsx(Field$2, {
									label: "Confirm password",
									error: passwordForm.errors.password_confirmation,
									children: /* @__PURE__ */ jsx("input", {
										type: "password",
										value: passwordForm.data.password_confirmation,
										onChange: (event) => passwordForm.setData("password_confirmation", event.target.value),
										className: "portal-input",
										autoComplete: "new-password",
										required: true
									})
								})
							]
						}),
						/* @__PURE__ */ jsx("button", {
							type: "submit",
							disabled: passwordForm.processing,
							className: "button-press focus-copper inline-flex h-12 w-fit items-center justify-center rounded-lg border border-neutral-500 px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white disabled:opacity-60",
							children: passwordForm.processing ? "Updating" : "Update password"
						})
					]
				})
			]
		})
	})] });
}
function Field$2({ label, error, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: "grid gap-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-red-700",
				children: error
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Portal/SellerListingDetail.tsx
var SellerListingDetail_exports = /* @__PURE__ */ __exportAll({ default: () => SellerListingDetail });
/**
* One listing, from its seller's side.
*
* A dedicated route rather than a slide-over like the other portal lists: the photo set,
* the document list, and the broker's buyer-facing copy are more than a panel holds, and
* a listing is the thing a seller actually wants to link to and come back to.
*
* Read-only by design. A seller submits a listing and Petra takes it from there, so
* nothing here is editable — offers are answered on the Offers page, which this links to.
*/
function SellerListingDetail({ portal, listing }) {
	const { status } = usePage().props;
	const openOffers = listing.offers.filter((offer) => offer.status === "pending").length;
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: `${listing.title} | Seller Portal` }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: listing.title,
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [/* @__PURE__ */ jsx(PortalPageHeader, {
				eyebrow: listing.public_id ?? "Listing",
				title: listing.title,
				description: [listing.status_label, listing.status_explanation].filter(Boolean).join(" · "),
				actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(BackLink, {
					href: "/seller/listings",
					className: "button-press focus-copper inline-flex h-11 w-full items-center justify-center rounded-lg border border-[#dad5cb] bg-white px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-neutral-700 transition-colors hover:border-[#a56437] hover:text-[#a56437] sm:w-auto",
					children: "All listings"
				}), listing.public_href && /* @__PURE__ */ jsx("a", {
					href: listing.public_href,
					target: "_blank",
					rel: "noreferrer",
					className: "button-press focus-copper inline-flex h-11 w-full items-center justify-center rounded-lg bg-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto",
					children: "View public page"
				})] })
			}), /* @__PURE__ */ jsxs("div", {
				className: "grid gap-4 xl:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)] xl:items-start",
				children: [/* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 xl:order-2",
					children: [/* @__PURE__ */ jsxs(Panel, {
						title: "Listing details",
						children: [
							/* @__PURE__ */ jsxs("div", {
								className: "rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: "Asking price"
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 font-heading text-2xl font-semibold text-neutral-900",
									children: listing.needs_valuation ? "Valuation requested" : formatUSD$1(listing.asking_price) ?? "Not provided"
								})]
							}),
							/* @__PURE__ */ jsxs("dl", {
								className: "mt-4 divide-y divide-[#ece7dd]",
								children: [
									/* @__PURE__ */ jsx(RailRow, {
										label: "Category",
										value: listing.category
									}),
									/* @__PURE__ */ jsx(RailRow, {
										label: "Region",
										value: listing.city ? `${listing.region} — ${listing.city}` : listing.region
									}),
									/* @__PURE__ */ jsx(RailRow, {
										label: "Condition",
										value: listing.condition_label
									}),
									/* @__PURE__ */ jsx(RailRow, {
										label: "Submitted",
										value: listing.created_at
									}),
									/* @__PURE__ */ jsx(RailRow, {
										label: "Published",
										value: listing.published_at
									}),
									listing.sold_at && /* @__PURE__ */ jsx(RailRow, {
										label: "Sold",
										value: listing.sold_at
									})
								]
							}),
							listing.condition_notes && /* @__PURE__ */ jsxs("div", {
								className: "mt-4 border-t border-[#ece7dd] pt-4",
								children: [/* @__PURE__ */ jsx("dt", {
									className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
									children: "Your condition notes (private)"
								}), /* @__PURE__ */ jsx("dd", {
									className: "mt-1 whitespace-pre-line text-sm leading-6 text-neutral-700",
									children: listing.condition_notes
								})]
							})
						]
					}), /* @__PURE__ */ jsx(Panel, {
						title: "Offers",
						aside: listing.offers.length > 0 ? /* @__PURE__ */ jsx(Link, {
							href: "/seller/offers",
							className: "focus-copper font-heading text-xs font-semibold uppercase tracking-[0.12em] text-[#a56437] underline-offset-4 hover:underline",
							children: openOffers > 0 ? `Respond to ${openOffers}` : "Go to Offers"
						}) : void 0,
						children: listing.offers.length === 0 ? /* @__PURE__ */ jsx("p", {
							className: "text-base leading-7 text-neutral-600",
							children: "No offers yet. Petra logs them here once a buyer deal is worked up."
						}) : /* @__PURE__ */ jsx("ul", {
							className: "grid gap-2",
							children: listing.offers.map((offer) => /* @__PURE__ */ jsxs("li", {
								className: "flex flex-wrap items-center justify-between gap-3 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3",
								children: [/* @__PURE__ */ jsxs("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ jsx("p", {
										className: "font-heading text-base font-semibold text-neutral-900",
										children: formatUSD$1(offer.amount)
									}), /* @__PURE__ */ jsxs("p", {
										className: "mt-0.5 text-xs text-neutral-500",
										children: [
											"Offered ",
											offer.offered_at ?? "n/a",
											offer.counter_amount ? ` · countered ${formatUSD$1(offer.counter_amount)}` : ""
										]
									})]
								}), /* @__PURE__ */ jsx(Pill, {
									tone: offer.status_tone,
									children: offer.status_label
								})]
							}, offer.id))
						})
					})]
				}), /* @__PURE__ */ jsxs("div", {
					className: "grid gap-4 xl:order-1",
					children: [
						/* @__PURE__ */ jsx(PhotoGallery, {
							photos: listing.photos,
							title: listing.title
						}),
						/* @__PURE__ */ jsx(Panel, {
							title: "What buyers see",
							aside: listing.featured ? /* @__PURE__ */ jsx(Pill, {
								tone: "success",
								children: "Featured"
							}) : void 0,
							children: hasEnrichment(listing) ? /* @__PURE__ */ jsxs("dl", {
								className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(Detail$1, {
										label: "Manufacturer",
										value: listing.manufacturer
									}),
									/* @__PURE__ */ jsx(Detail$1, {
										label: "Model",
										value: listing.model
									}),
									/* @__PURE__ */ jsx(Detail$1, {
										label: "Year",
										value: listing.year != null ? String(listing.year) : null
									}),
									/* @__PURE__ */ jsx(Detail$1, {
										label: "Capacity",
										value: listing.capacity
									}),
									listing.public_description && /* @__PURE__ */ jsxs("div", {
										className: "sm:col-span-2",
										children: [/* @__PURE__ */ jsx("dt", {
											className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
											children: "Public description"
										}), /* @__PURE__ */ jsx("dd", {
											className: "mt-1 whitespace-pre-line text-neutral-700",
											children: listing.public_description
										})]
									})
								]
							}) : /* @__PURE__ */ jsx("p", {
								className: "text-base leading-7 text-neutral-600",
								children: "Petra has not written the buyer-facing copy for this unit yet. It appears here once a broker completes the review."
							})
						}),
						/* @__PURE__ */ jsx(Panel, {
							title: "Documents",
							children: listing.documents.length === 0 ? /* @__PURE__ */ jsx("p", {
								className: "text-base leading-7 text-neutral-600",
								children: "No documents uploaded."
							}) : /* @__PURE__ */ jsx("ul", {
								className: "grid gap-2",
								children: listing.documents.map((document) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-center justify-between gap-4 rounded-lg border border-[#dad5cb] bg-[#f8f8f6] px-4 py-3",
									children: [/* @__PURE__ */ jsx("a", {
										href: document.url,
										target: "_blank",
										rel: "noreferrer",
										className: "focus-copper min-w-0 truncate text-sm font-semibold text-[#a56437] underline-offset-4 hover:underline",
										children: document.name
									}), /* @__PURE__ */ jsx(Pill, {
										tone: document.public ? "success" : "muted",
										children: document.public ? "Public" : "Private"
									})]
								}, document.path))
							})
						})
					]
				})]
			})]
		})
	})] });
}
function hasEnrichment(listing) {
	return Boolean(listing.public_description || listing.manufacturer || listing.model || listing.year != null || listing.capacity);
}
function PhotoGallery({ photos, title }) {
	const [activeIndex, setActiveIndex] = useState(0);
	const [failed, setFailed] = useState({});
	const active = photos[activeIndex];
	if (photos.length === 0) return /* @__PURE__ */ jsx("div", {
		className: "grid h-32 place-items-center rounded-xl border border-[#dad5cb] bg-white text-sm text-neutral-500 shadow-sm",
		children: "No photos uploaded."
	});
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ jsx("div", {
			className: "aspect-[16/9] max-h-[360px] overflow-hidden rounded-xl border border-[#dad5cb] bg-[#f3f1ec] shadow-sm",
			children: active && !failed[activeIndex] ? /* @__PURE__ */ jsx("img", {
				src: active.url,
				alt: `${title} — photo ${activeIndex + 1} of ${photos.length}`,
				className: "h-full w-full object-cover",
				onError: () => setFailed((current) => ({
					...current,
					[activeIndex]: true
				}))
			}) : /* @__PURE__ */ jsx("div", {
				className: "grid h-full place-items-center text-sm text-neutral-500",
				children: "Image unavailable"
			})
		}), photos.length > 1 && /* @__PURE__ */ jsx("div", {
			className: "flex flex-wrap gap-2",
			children: photos.map((photo, index) => /* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: () => setActiveIndex(index),
				"aria-label": `Show photo ${index + 1}`,
				"aria-current": index === activeIndex,
				className: `focus-copper h-16 w-20 overflow-hidden rounded-lg border-2 transition-colors ${index === activeIndex ? "border-[#a56437]" : "border-transparent hover:border-[#dad5cb]"}`,
				children: failed[index] ? /* @__PURE__ */ jsx("span", {
					className: "grid h-full w-full place-items-center bg-[#f3f1ec] text-[0.6rem] text-neutral-400",
					children: "n/a"
				}) : /* @__PURE__ */ jsx("img", {
					src: photo.url,
					alt: "",
					loading: "lazy",
					className: "h-full w-full object-cover",
					onError: () => setFailed((current) => ({
						...current,
						[index]: true
					}))
				})
			}, photo.path))
		})]
	});
}
function Panel({ title, aside, children }) {
	return /* @__PURE__ */ jsxs("section", {
		className: "rounded-xl border border-[#dad5cb] bg-white p-5 shadow-sm sm:p-6",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "flex flex-wrap items-center justify-between gap-3",
			children: [/* @__PURE__ */ jsx("h2", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
				children: title
			}), aside]
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4",
			children
		})]
	});
}
var toneClasses$2 = {
	neutral: "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700",
	success: "border-emerald-800/25 bg-emerald-50 text-emerald-800",
	warning: "border-amber-800/25 bg-amber-50 text-amber-800",
	muted: "border-neutral-300 bg-neutral-100 text-neutral-500",
	danger: "border-[#b3261e]/25 bg-red-50 text-[#b3261e]"
};
function Pill({ tone, children }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses$2[tone] ?? toneClasses$2.neutral}`,
		children
	});
}
/** A compact row for the side rail, where vertical space is worth more than symmetry. */
function RailRow({ label, value }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "flex items-baseline justify-between gap-4 py-2.5",
		children: [/* @__PURE__ */ jsx("dt", {
			className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
			children: label
		}), /* @__PURE__ */ jsx("dd", {
			className: "min-w-0 text-right text-sm text-neutral-800",
			children: value || "Not provided"
		})]
	});
}
function Detail$1({ label, value }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "mt-1 text-neutral-700",
		children: value || "Not provided"
	})] });
}
function formatUSD$1(value) {
	if (!value) return null;
	const amount = Number(value);
	return Number.isNaN(amount) ? value : amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
}
//#endregion
//#region resources/js/Components/file-pickers.tsx
function formatFileSize(bytes) {
	if (bytes < 1024 * 1024) return `${Math.max(1, Math.round(bytes / 1024))} KB`;
	return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}
function PhotoPicker({ files, error, onChange, label = "Photos optional", hint = "Choose one or more equipment images. Previews will appear below before submission." }) {
	const [previews, setPreviews] = useState([]);
	useEffect(() => {
		const nextPreviews = files.map((file) => ({
			file,
			url: URL.createObjectURL(file)
		}));
		setPreviews(nextPreviews);
		return () => {
			nextPreviews.forEach((preview) => URL.revokeObjectURL(preview.url));
		};
	}, [files]);
	function removeFile(index) {
		onChange(files.filter((_, fileIndex) => fileIndex !== index));
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 sm:col-span-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 grid cursor-pointer gap-3 border border-dashed border-[#cfc7ba] bg-white p-5 transition-colors hover:border-[#a56437] hover:bg-[#fbfaf8]",
				children: [
					/* @__PURE__ */ jsx("input", {
						type: "file",
						multiple: true,
						accept: "image/*",
						onChange: (event) => {
							onChange(Array.from(event.target.files ?? []));
							event.currentTarget.value = "";
						},
						className: "sr-only"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: "Add photos"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-sm leading-6 text-neutral-600",
						children: hint
					})
				]
			}),
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			}),
			previews.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "grid gap-3 sm:grid-cols-2",
				children: previews.map((preview, index) => /* @__PURE__ */ jsxs("article", {
					className: "overflow-hidden rounded-lg border border-[#dad5cb] bg-white",
					children: [/* @__PURE__ */ jsx("div", {
						className: "aspect-[4/3] bg-[#f3f1ec]",
						children: /* @__PURE__ */ jsx("img", {
							src: preview.url,
							alt: preview.file.name,
							className: "h-full w-full object-cover"
						})
					}), /* @__PURE__ */ jsxs("div", {
						className: "grid gap-3 p-3",
						children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-sm font-semibold text-neutral-900",
							children: preview.file.name
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-neutral-500",
							children: formatFileSize(preview.file.size)
						})] }), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => removeFile(index),
							className: "focus-copper w-fit font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline",
							children: "Remove"
						})]
					})]
				}, `${preview.file.name}-${preview.file.lastModified}`))
			})
		]
	});
}
function DocumentPicker({ files, error, onChange, label = "Documents optional", hint = "Upload optional spec sheets, service records, or other supporting files." }) {
	function removeFile(index) {
		onChange(files.filter((_, fileIndex) => fileIndex !== index));
	}
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-3 sm:col-span-2",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: label
			}),
			/* @__PURE__ */ jsxs("label", {
				className: "button-press focus-within:ring-2 focus-within:ring-[#a56437]/40 grid cursor-pointer gap-3 border border-dashed border-[#cfc7ba] bg-white p-5 transition-colors hover:border-[#a56437] hover:bg-[#fbfaf8]",
				children: [
					/* @__PURE__ */ jsx("input", {
						type: "file",
						multiple: true,
						onChange: (event) => {
							onChange(Array.from(event.target.files ?? []));
							event.currentTarget.value = "";
						},
						className: "sr-only"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "font-heading text-lg font-semibold uppercase tracking-[0.08em] text-neutral-950",
						children: "Add documents"
					}),
					/* @__PURE__ */ jsx("span", {
						className: "text-sm leading-6 text-neutral-600",
						children: hint
					})
				]
			}),
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			}),
			files.length > 0 && /* @__PURE__ */ jsx("div", {
				className: "grid gap-2",
				children: files.map((file, index) => /* @__PURE__ */ jsxs("article", {
					className: "flex items-center justify-between gap-4 rounded-lg border border-[#dad5cb] bg-white p-3",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "min-w-0",
						children: [/* @__PURE__ */ jsx("p", {
							className: "truncate text-sm font-semibold text-neutral-900",
							children: file.name
						}), /* @__PURE__ */ jsx("p", {
							className: "mt-1 text-xs text-neutral-500",
							children: formatFileSize(file.size)
						})]
					}), /* @__PURE__ */ jsx("button", {
						type: "button",
						onClick: () => removeFile(index),
						className: "focus-copper shrink-0 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] underline-offset-4 hover:underline",
						children: "Remove"
					})]
				}, `${file.name}-${file.lastModified}`))
			})
		]
	});
}
//#endregion
//#region resources/js/Pages/Portal/SellerListings.tsx
var SellerListings_exports = /* @__PURE__ */ __exportAll({ default: () => SellerListings });
var requiredFields = [
	{
		name: "title",
		message: "Enter an equipment title."
	},
	{
		name: "category",
		message: "Select a category."
	},
	{
		name: "region",
		message: "Select a region."
	},
	{
		name: "condition",
		message: "Select a condition."
	}
];
function emptyForm$1() {
	return {
		title: "",
		category: "",
		region: "",
		city: "",
		condition: "",
		condition_notes: "",
		asking_price: "",
		needs_valuation: false,
		photos: [],
		documents: []
	};
}
function SellerListings({ portal, submissions, categoryOptions, regionOptions, conditionOptions }) {
	const [isFormOpen, setIsFormOpen] = useState(false);
	const [search, setSearch] = useRemember("", "seller-listings-search");
	const [page, setPage] = useRemember(1, "seller-listings-page");
	const [pageSize, setPageSize] = useRemember(10, "seller-listings-page-size");
	const [clientErrors, setClientErrors] = useState({});
	const fieldRefs = useRef({
		title: null,
		category: null,
		region: null,
		condition: null
	});
	const form = useForm(emptyForm$1());
	useScrollMemory({
		key: "seller-listings",
		detailPrefix: "/seller/listings/"
	});
	function openForm(prefill) {
		form.clearErrors();
		setClientErrors({});
		form.setData({
			...emptyForm$1(),
			...prefill
		});
		setIsFormOpen(true);
	}
	function errorFor(field) {
		const serverErrors = form.errors;
		return clientErrors[field] ?? serverErrors[field];
	}
	function clearError(field) {
		setClientErrors((errors) => {
			if (!errors[field]) return errors;
			const next = { ...errors };
			delete next[field];
			return next;
		});
	}
	function submit(event) {
		event.preventDefault();
		const errors = {};
		requiredFields.forEach((field) => {
			if (!form.data[field.name].trim()) errors[field.name] = field.message;
		});
		setClientErrors(errors);
		const firstInvalid = requiredFields.find((field) => errors[field.name]);
		if (firstInvalid) {
			fieldRefs.current[firstInvalid.name]?.focus();
			return;
		}
		const { category, region } = form.data;
		form.post("/seller/listings", {
			forceFormData: true,
			preserveScroll: true,
			onSuccess: () => {
				setIsFormOpen(false);
				setClientErrors({});
				form.reset();
				toast.success("Equipment submitted.", {
					description: "A broker will review it shortly.",
					action: {
						label: "Submit another",
						onClick: () => openForm({
							category,
							region
						})
					}
				});
			}
		});
	}
	const filtered = useMemo(() => {
		const term = search.trim().toLowerCase();
		if (!term) return submissions;
		return submissions.filter((submission) => [
			submission.title,
			submission.category,
			submission.region,
			submission.city,
			submission.condition_label,
			submission.status_label
		].filter(Boolean).join(" ").toLowerCase().includes(term));
	}, [submissions, search]);
	const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
	const currentPage = Math.min(page, totalPages);
	const pageItems = filtered.slice((currentPage - 1) * pageSize, currentPage * pageSize);
	const rangeStart = filtered.length === 0 ? 0 : (currentPage - 1) * pageSize + 1;
	const rangeEnd = Math.min(currentPage * pageSize, filtered.length);
	const showPagination = filtered.length > 10;
	function updateSearch(value) {
		setSearch(value);
		setPage(1);
	}
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "My Listings | Seller Portal" }), /* @__PURE__ */ jsx(PortalShell, {
		portal,
		title: "My Listings",
		children: /* @__PURE__ */ jsxs("div", {
			className: "grid gap-4",
			children: [
				/* @__PURE__ */ jsx(PortalPageHeader, {
					eyebrow: "Listed Equipment",
					title: "Your Submissions",
					description: search.trim() ? `${filtered.length} of ${submissions.length} ${submissions.length === 1 ? "listing" : "listings"}` : `${submissions.length} ${submissions.length === 1 ? "listing" : "listings"} · track review status here.`,
					actions: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs("div", {
						className: "relative sm:w-72",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400",
								children: /* @__PURE__ */ jsx(SearchIcon, {})
							}),
							/* @__PURE__ */ jsx("input", {
								type: "search",
								value: search,
								onChange: (event) => updateSearch(event.target.value),
								placeholder: "Search listings",
								"aria-label": "Search listings",
								className: "h-11 w-full rounded-lg border border-[#dad5cb] bg-white pl-10 pr-9 text-sm text-neutral-900 outline-none transition-colors placeholder:text-neutral-400 focus:border-[#a56437] focus:ring-2 focus:ring-[#a56437]/15 [&::-webkit-search-cancel-button]:appearance-none"
							}),
							search && /* @__PURE__ */ jsx("button", {
								type: "button",
								onClick: () => updateSearch(""),
								"aria-label": "Clear search",
								className: "focus-copper absolute right-2 top-1/2 flex h-6 w-6 -translate-y-1/2 items-center justify-center rounded-md text-neutral-400 transition-colors hover:bg-[#f3f1ec] hover:text-neutral-700",
								children: /* @__PURE__ */ jsx(CloseIcon, {})
							})
						]
					}), /* @__PURE__ */ jsxs("button", {
						type: "button",
						onClick: () => openForm(),
						className: "button-press focus-copper inline-flex h-11 w-full shrink-0 items-center justify-center gap-2 rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 sm:w-auto",
						children: [/* @__PURE__ */ jsx(PlusIcon, {}), "Submit Equipment"]
					})] })
				}),
				/* @__PURE__ */ jsx(SlideOver, {
					open: isFormOpen,
					onClose: () => setIsFormOpen(false),
					eyebrow: "Submit Equipment",
					title: "What We Need",
					children: /* @__PURE__ */ jsxs("form", {
						onSubmit: submit,
						noValidate: true,
						className: "grid gap-5 sm:grid-cols-2",
						children: [
							/* @__PURE__ */ jsx(Field$1, {
								label: "Equipment title",
								required: true,
								error: errorFor("title"),
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx("input", {
									ref: (element) => {
										fieldRefs.current.title = element;
									},
									value: form.data.title,
									onChange: (event) => {
										form.setData("title", event.target.value);
										clearError("title");
									},
									placeholder: "e.g. Ajax DPC-2803 Compressor",
									"aria-invalid": Boolean(errorFor("title")),
									className: inputClass$1(errorFor("title"))
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Category",
								required: true,
								error: errorFor("category"),
								children: /* @__PURE__ */ jsxs("select", {
									ref: (element) => {
										fieldRefs.current.category = element;
									},
									value: form.data.category,
									onChange: (event) => {
										form.setData("category", event.target.value);
										clearError("category");
									},
									"aria-invalid": Boolean(errorFor("category")),
									className: inputClass$1(errorFor("category")),
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Select a category"
									}), categoryOptions.map((category) => /* @__PURE__ */ jsx("option", {
										value: category,
										children: category
									}, category))]
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Region",
								required: true,
								error: errorFor("region"),
								children: /* @__PURE__ */ jsxs("select", {
									ref: (element) => {
										fieldRefs.current.region = element;
									},
									value: form.data.region,
									onChange: (event) => {
										form.setData("region", event.target.value);
										clearError("region");
									},
									"aria-invalid": Boolean(errorFor("region")),
									className: inputClass$1(errorFor("region")),
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Select a region"
									}), regionOptions.map((region) => /* @__PURE__ */ jsx("option", {
										value: region,
										children: region
									}, region))]
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "City / yard location",
								error: errorFor("city"),
								children: /* @__PURE__ */ jsx("input", {
									value: form.data.city,
									onChange: (event) => form.setData("city", event.target.value),
									placeholder: "e.g. Casper",
									className: inputClass$1(errorFor("city"))
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Condition",
								required: true,
								error: errorFor("condition"),
								children: /* @__PURE__ */ jsxs("select", {
									ref: (element) => {
										fieldRefs.current.condition = element;
									},
									value: form.data.condition,
									onChange: (event) => {
										form.setData("condition", event.target.value);
										clearError("condition");
									},
									"aria-invalid": Boolean(errorFor("condition")),
									className: inputClass$1(errorFor("condition")),
									children: [/* @__PURE__ */ jsx("option", {
										value: "",
										children: "Select a condition"
									}), Object.entries(conditionOptions).map(([value, label]) => /* @__PURE__ */ jsx("option", {
										value,
										children: label
									}, value))]
								})
							}),
							/* @__PURE__ */ jsx(Field$1, {
								label: "Condition notes",
								error: errorFor("condition_notes"),
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx("textarea", {
									value: form.data.condition_notes,
									onChange: (event) => form.setData("condition_notes", event.target.value),
									className: `${inputClass$1(errorFor("condition_notes"))} min-h-28 py-3`,
									placeholder: "Tell us what you know — last use, known issues, how it's stored. Rough is fine."
								})
							}),
							/* @__PURE__ */ jsxs(Field$1, {
								label: "Asking price",
								error: errorFor("asking_price"),
								className: "sm:col-span-2",
								children: [/* @__PURE__ */ jsx("input", {
									type: "number",
									min: "0",
									step: "0.01",
									inputMode: "decimal",
									value: form.data.asking_price,
									disabled: form.data.needs_valuation,
									onChange: (event) => form.setData("asking_price", event.target.value),
									placeholder: "USD",
									"aria-invalid": Boolean(errorFor("asking_price")),
									className: inputClass$1(errorFor("asking_price"))
								}), /* @__PURE__ */ jsxs("label", {
									className: "mt-1 flex w-fit cursor-pointer items-center gap-3",
									children: [/* @__PURE__ */ jsx("input", {
										type: "checkbox",
										checked: form.data.needs_valuation,
										onChange: (event) => {
											const checked = event.target.checked;
											form.setData((data) => ({
												...data,
												needs_valuation: checked,
												asking_price: checked ? "" : data.asking_price
											}));
										},
										className: "h-4 w-4 shrink-0 accent-[#a56437]"
									}), /* @__PURE__ */ jsx("span", {
										className: "text-base leading-7 text-neutral-600",
										children: "Not sure — help me price it"
									})]
								})]
							}),
							/* @__PURE__ */ jsx(PhotoPicker, {
								files: form.data.photos,
								error: errorFor("photos"),
								onChange: (files) => form.setData("photos", files)
							}),
							/* @__PURE__ */ jsx(DocumentPicker, {
								files: form.data.documents,
								error: errorFor("documents"),
								onChange: (files) => form.setData("documents", files)
							}),
							/* @__PURE__ */ jsx("div", {
								className: "sm:col-span-2",
								children: /* @__PURE__ */ jsx("button", {
									type: "submit",
									disabled: form.processing,
									className: "button-press focus-copper inline-flex h-12 w-full items-center justify-center rounded-lg bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60 sm:w-auto",
									children: form.processing ? "Submitting" : "Submit Equipment"
								})
							})
						]
					})
				}),
				/* @__PURE__ */ jsx("section", {
					className: "grid gap-5",
					children: submissions.length === 0 ? /* @__PURE__ */ jsx(EmptyState, { onSubmit: () => openForm() }) : filtered.length === 0 ? /* @__PURE__ */ jsx(NoResults, {
						search,
						onClear: () => updateSearch("")
					}) : /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("div", {
						className: "grid gap-2",
						children: pageItems.map((submission) => /* @__PURE__ */ jsx(ListingCard, { submission }, submission.id))
					}), showPagination && /* @__PURE__ */ jsx(Pagination, {
						page: currentPage,
						totalPages,
						rangeStart,
						rangeEnd,
						total: filtered.length,
						onChange: setPage,
						pageSize,
						onPageSizeChange: (size) => {
							setPageSize(size);
							setPage(1);
						}
					})] })
				})
			]
		})
	})] });
}
var toneClasses$1 = {
	neutral: "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700",
	success: "border-emerald-800/25 bg-emerald-50 text-emerald-800",
	warning: "border-amber-800/25 bg-amber-50 text-amber-800",
	muted: "border-neutral-300 bg-neutral-100 text-neutral-500",
	danger: "border-[#b3261e]/25 bg-red-50 text-[#b3261e]"
};
function StatusBadge$1({ label, tone }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] shadow-sm ${toneClasses$1[tone] ?? toneClasses$1.neutral}`,
		children: label
	});
}
function ListingCard({ submission }) {
	const [coverFailed, setCoverFailed] = useState(false);
	const cover = submission.photos[0];
	const extraPhotos = submission.photos.length - 1;
	const showCover = Boolean(cover) && !coverFailed;
	return /* @__PURE__ */ jsxs(Link, {
		href: `/seller/listings/${submission.id}`,
		className: "interactive-lift focus-copper flex gap-4 overflow-hidden rounded-xl border border-[#dad5cb] bg-white p-3 shadow-sm transition-colors hover:border-[#a56437] sm:gap-5 sm:p-4",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "relative h-24 w-24 shrink-0 overflow-hidden rounded-lg bg-[#f3f1ec] sm:h-28 sm:w-36",
			children: [showCover ? /* @__PURE__ */ jsx("img", {
				src: cover.url,
				alt: "",
				loading: "lazy",
				onError: () => setCoverFailed(true),
				className: "h-full w-full object-cover"
			}) : /* @__PURE__ */ jsx("span", {
				className: "flex h-full w-full items-center justify-center text-[#cbc0ae]",
				children: /* @__PURE__ */ jsx(EquipmentGlyph, {})
			}), extraPhotos > 0 && /* @__PURE__ */ jsxs("span", {
				className: "absolute bottom-1 right-1 rounded-full bg-neutral-950/70 px-1.5 py-0.5 font-heading text-[0.6rem] font-semibold uppercase tracking-[0.08em] text-white",
				children: ["+", extraPhotos]
			})]
		}), /* @__PURE__ */ jsxs("div", {
			className: "flex min-w-0 flex-1 flex-col gap-1",
			children: [
				/* @__PURE__ */ jsxs("div", {
					className: "flex items-start justify-between gap-3",
					children: [/* @__PURE__ */ jsx("h3", {
						className: "truncate font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
						title: submission.title,
						children: submission.title
					}), /* @__PURE__ */ jsx(StatusBadge$1, {
						label: submission.status_label,
						tone: submission.status_tone
					})]
				}),
				/* @__PURE__ */ jsx("p", {
					className: "truncate text-xs leading-5 text-neutral-500",
					children: [
						submission.category,
						formatRegion(submission),
						submission.condition_label,
						formatPrice(submission)
					].filter(Boolean).join(" · ")
				}),
				/* @__PURE__ */ jsxs("p", {
					className: "truncate text-xs leading-5 text-neutral-400",
					children: [submission.created_at, submission.status_explanation ? ` · ${submission.status_explanation}` : ""]
				}),
				/* @__PURE__ */ jsxs("div", {
					className: "mt-auto flex flex-wrap items-center gap-3 pt-1",
					children: [/* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1.5 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-neutral-400",
						children: [
							/* @__PURE__ */ jsx(PhotoIcon, {}),
							submission.photos.length,
							" ",
							submission.photos.length === 1 ? "photo" : "photos"
						]
					}), /* @__PURE__ */ jsxs("span", {
						className: "inline-flex items-center gap-1.5 font-heading text-[0.68rem] font-semibold uppercase tracking-[0.1em] text-neutral-400",
						children: [/* @__PURE__ */ jsx(FileIcon, {}), submission.documents.length === 0 ? "No docs" : `${submission.documents.length} ${submission.documents.length === 1 ? "doc" : "docs"}`]
					})]
				})
			]
		})]
	});
}
function EmptyState({ onSubmit }) {
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-2xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm sm:p-12",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ece4] text-[#a56437]",
				children: /* @__PURE__ */ jsx(EquipmentGlyph, {})
			}),
			/* @__PURE__ */ jsx("h3", {
				className: "mt-6 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
				children: "Got equipment sitting in a yard?"
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mx-auto mt-4 max-w-xl text-base leading-7 text-neutral-600",
				children: "Submit it to Petra and a broker will review the asset, position it, and work the buyer side for you."
			}),
			/* @__PURE__ */ jsxs("button", {
				type: "button",
				onClick: onSubmit,
				className: "button-press focus-copper mt-8 inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-[#a56437] px-8 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
				children: [/* @__PURE__ */ jsx(PlusIcon, {}), "Submit Equipment"]
			})
		]
	});
}
function FileIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-3.5 w-3.5 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M7 3h7l4 4v14H7z" }),
			/* @__PURE__ */ jsx("path", { d: "M14 3v5h5" }),
			/* @__PURE__ */ jsx("path", { d: "M10 13h6" }),
			/* @__PURE__ */ jsx("path", { d: "M10 17h4" })
		]
	});
}
function PhotoIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-3.5 w-3.5 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M4 5h16v14H4z" }),
			/* @__PURE__ */ jsx("path", { d: "M4 15l4-4 4 4 3-3 5 5" }),
			/* @__PURE__ */ jsx("path", { d: "M9 9a1 1 0 1 1-2 0 1 1 0 0 1 2 0" })
		]
	});
}
function PlusIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M12 5v14" }), /* @__PURE__ */ jsx("path", { d: "M5 12h14" })]
	});
}
function EquipmentGlyph() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-7 w-7 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.6,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ jsx("path", { d: "M4 16h16" }),
			/* @__PURE__ */ jsx("path", { d: "M6 16l2-6h8l2 6" }),
			/* @__PURE__ */ jsx("path", { d: "M8 18.5h.01" }),
			/* @__PURE__ */ jsx("path", { d: "M16 18.5h.01" }),
			/* @__PURE__ */ jsx("path", { d: "M9 10V7h6v3" })
		]
	});
}
function SearchIcon({ className = "h-5 w-5" }) {
	return /* @__PURE__ */ jsxs("svg", {
		className: `${className} shrink-0`,
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 1.8,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("circle", {
			cx: "11",
			cy: "11",
			r: "7"
		}), /* @__PURE__ */ jsx("path", { d: "M20 20l-3.5-3.5" })]
	});
}
function CloseIcon() {
	return /* @__PURE__ */ jsxs("svg", {
		className: "h-4 w-4 shrink-0",
		fill: "none",
		stroke: "currentColor",
		strokeLinecap: "round",
		strokeLinejoin: "round",
		strokeWidth: 2,
		viewBox: "0 0 24 24",
		"aria-hidden": "true",
		children: [/* @__PURE__ */ jsx("path", { d: "M6 6l12 12" }), /* @__PURE__ */ jsx("path", { d: "M18 6L6 18" })]
	});
}
function NoResults({ search, onClear }) {
	const term = search.trim();
	return /* @__PURE__ */ jsxs("article", {
		className: "rounded-2xl border border-[#dad5cb] bg-white p-8 text-center shadow-sm sm:p-12",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#f4ece4] text-[#a56437]",
				children: /* @__PURE__ */ jsx(SearchIcon, { className: "h-7 w-7" })
			}),
			/* @__PURE__ */ jsxs("h3", {
				className: "mt-6 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
				children: ["No listings match", term ? ` “${term}”` : ""]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mx-auto mt-3 max-w-md text-base leading-7 text-neutral-600",
				children: "Try a different search — by title, category, region, condition, or status."
			}),
			/* @__PURE__ */ jsx("button", {
				type: "button",
				onClick: onClear,
				className: "button-press focus-copper mt-6 inline-flex h-11 items-center justify-center rounded-lg border border-[#a56437] px-6 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white",
				children: "Clear search"
			})
		]
	});
}
function Field$1({ label, error, required = false, className = "", children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `grid gap-2 ${className}`,
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: [label, !required && /* @__PURE__ */ jsx("span", {
					className: "ml-2 text-neutral-400",
					children: "Optional"
				})]
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			})
		]
	});
}
function inputClass$1(error) {
	return `portal-input${error ? " portal-input-error" : ""}`;
}
function formatRegion(submission) {
	return submission.city ? `${submission.region} — ${submission.city}` : submission.region;
}
function formatPrice(submission) {
	if (submission.needs_valuation) return "Valuation requested";
	if (!submission.asking_price) return null;
	const amount = Number(submission.asking_price);
	if (Number.isNaN(amount)) return submission.asking_price;
	return amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
}
//#endregion
//#region resources/js/Pages/Portal/SellerOffers.tsx
var SellerOffers_exports = /* @__PURE__ */ __exportAll({ default: () => SellerOffers });
function SellerOffers({ portal, offers }) {
	const { status } = usePage().props;
	const [activeId, setActiveId] = useState(null);
	const active = offers.find((offer) => offer.id === activeId) ?? null;
	const awaiting = offers.filter((offer) => offer.can_respond).length;
	useEffect(() => {
		if (status) toast.success(status);
	}, [status]);
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(Head, { title: "Offers | Seller Portal" }), /* @__PURE__ */ jsxs(PortalShell, {
		portal,
		title: "Offers",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "grid gap-6",
			children: [/* @__PURE__ */ jsx(PortalPageHeader, {
				eyebrow: "Received Offers",
				title: "Your Offers",
				description: offers.length === 0 ? "Petra negotiates, then logs each offer here." : `${offers.length} ${offers.length === 1 ? "offer" : "offers"} · ${awaiting > 0 ? `${awaiting} awaiting your response.` : "nothing awaiting you."}`,
				actions: /* @__PURE__ */ jsx(Link, {
					href: "/seller/listings",
					className: portalHeaderActionClass,
					children: "My Listings"
				})
			}), offers.length === 0 ? /* @__PURE__ */ jsx("article", {
				className: "rounded-xl border border-[#dad5cb] bg-white p-6 text-base leading-7 text-neutral-600 shadow-sm",
				children: "No offers yet. Once Petra works a buyer deal on one of your listings, the offer will appear here for you to accept, decline, or counter."
			}) : /* @__PURE__ */ jsx(DataTable, {
				columns: OFFER_COLUMNS,
				rows: offers,
				rowKey: (offer) => offer.id,
				onRowClick: (offer) => setActiveId(offer.id),
				rowLabel: (offer) => `Open offer on ${offer.listing_title ?? "removed listing"}`,
				caption: "Offers Petra has logged on your equipment"
			})]
		}), /* @__PURE__ */ jsx(SlideOver, {
			open: active !== null,
			onClose: () => setActiveId(null),
			eyebrow: active?.listing_public_id ?? "Offer",
			title: active?.listing_title ?? "Listing removed",
			children: active && /* @__PURE__ */ jsxs("div", {
				className: "grid gap-6",
				children: [/* @__PURE__ */ jsxs("dl", {
					className: "grid gap-4 text-base leading-7 text-neutral-600 sm:grid-cols-2",
					children: [
						/* @__PURE__ */ jsx(Detail, {
							label: "Listing",
							children: active.listing_href && active.listing_public_id ? /* @__PURE__ */ jsx(Link, {
								href: active.listing_href,
								className: "focus-copper font-semibold text-[#a56437] underline-offset-4 hover:underline",
								children: active.listing_public_id
							}) : /* @__PURE__ */ jsx("span", {
								className: "text-neutral-500",
								children: active.listing_public_id ?? "Not yet published"
							})
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Status",
							children: /* @__PURE__ */ jsx(StatusBadge, {
								label: active.status_label,
								tone: active.status_tone
							})
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Offer amount",
							children: /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-neutral-900",
								children: formatUSD(active.amount)
							})
						}),
						/* @__PURE__ */ jsx(Detail, {
							label: "Offered",
							children: /* @__PURE__ */ jsx("span", { children: active.offered_at ?? "Date not available" })
						}),
						active.counter_amount && /* @__PURE__ */ jsx(Detail, {
							label: active.status === "accepted" ? "Agreed amount" : "Your counter",
							children: /* @__PURE__ */ jsx("span", {
								className: "font-semibold text-neutral-900",
								children: formatUSD(active.counter_amount)
							})
						})
					]
				}), active.can_respond ? /* @__PURE__ */ jsx(OfferResponse, { offer: active }, `${active.id}:${active.status}`) : /* @__PURE__ */ jsxs("p", {
					className: "border-t border-[#dad5cb] pt-5 text-base leading-7 text-neutral-600",
					children: [
						"This offer is ",
						active.status_label.toLowerCase(),
						" — there is nothing left for you to respond to. Petra will be in touch if the negotiation reopens."
					]
				})]
			})
		})]
	})] });
}
/**
* Column layout. Listing and Status hold at every width; amounts and the offer date drop
* away on narrower screens rather than forcing a sideways scroll.
*/
var OFFER_COLUMNS = [
	{
		key: "listing",
		header: "Listing",
		cell: (offer) => /* @__PURE__ */ jsx(CellStack, {
			primary: /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx("span", {
				className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-neutral-950",
				children: offer.listing_title ?? "Listing removed"
			}), offer.can_respond && /* @__PURE__ */ jsx("span", {
				className: "rounded-full bg-amber-50 px-2 py-0.5 font-heading text-[0.65rem] font-semibold uppercase tracking-[0.1em] text-amber-800",
				children: "Action needed"
			})] }),
			secondary: offer.listing_public_id ?? "Not yet published"
		})
	},
	{
		key: "amount",
		header: "Offer",
		align: "right",
		cell: (offer) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap font-semibold text-neutral-900",
			children: formatUSD(offer.amount)
		})
	},
	{
		key: "counter",
		header: "Counter",
		hideBelow: "md",
		align: "right",
		cell: (offer) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: offer.counter_amount ? formatUSD(offer.counter_amount) : "—"
		})
	},
	{
		key: "offered_at",
		header: "Offered",
		hideBelow: "xl",
		cell: (offer) => /* @__PURE__ */ jsx("span", {
			className: "whitespace-nowrap",
			children: offer.offered_at ?? "—"
		})
	},
	{
		key: "status",
		header: "Status",
		align: "right",
		cell: (offer) => /* @__PURE__ */ jsx(StatusBadge, {
			label: offer.status_label,
			tone: offer.status_tone
		})
	}
];
/**
* Accept / decline / counter. A counter records the amount and flips the status to
* "Countered", handing the offer back to the broker. The broker answers it in the review
* view — accepting your number, declining, or re-offering, which returns the offer here
* as Pending for another round.
*/
function OfferResponse({ offer }) {
	const [counterOpen, setCounterOpen] = useState(false);
	const form = useForm({
		action: "",
		counter_amount: ""
	});
	function respond(action) {
		form.transform((data) => ({
			...data,
			action,
			counter_amount: ""
		}));
		form.patch(`/seller/offers/${offer.id}`, { preserveScroll: true });
	}
	function submitCounter(event) {
		event.preventDefault();
		form.transform((data) => ({
			...data,
			action: "counter"
		}));
		form.patch(`/seller/offers/${offer.id}`, {
			preserveScroll: true,
			onSuccess: () => {
				setCounterOpen(false);
				form.reset("counter_amount");
			}
		});
	}
	const counterError = form.errors.counter_amount;
	return /* @__PURE__ */ jsxs("div", {
		className: "border-t border-[#dad5cb] pt-5",
		children: [
			/* @__PURE__ */ jsx("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
				children: "Respond"
			}),
			/* @__PURE__ */ jsxs("div", {
				className: "mt-3 flex flex-wrap items-center gap-3",
				children: [
					/* @__PURE__ */ jsxs("button", {
						type: "button",
						disabled: form.processing,
						onClick: () => respond("accept"),
						className: "button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
						children: ["Accept ", formatUSD(offer.amount)]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: form.processing,
						onClick: () => respond("decline"),
						className: "button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg border border-[#b3261e] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#b3261e] transition-colors hover:bg-[#b3261e] hover:text-white disabled:opacity-60",
						children: "Decline"
					}),
					/* @__PURE__ */ jsx("button", {
						type: "button",
						disabled: form.processing,
						onClick: () => setCounterOpen((open) => !open),
						"aria-expanded": counterOpen,
						className: "button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg border border-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-[#a56437] transition-colors hover:bg-[#a56437] hover:text-white disabled:opacity-60",
						children: "Counter"
					})
				]
			}),
			counterOpen && /* @__PURE__ */ jsxs("form", {
				onSubmit: submitCounter,
				className: "mt-4 flex flex-col gap-2 sm:flex-row sm:items-end",
				children: [
					/* @__PURE__ */ jsxs("label", {
						className: "grid gap-2",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
							children: "Counter amount (USD)"
						}), /* @__PURE__ */ jsx("input", {
							type: "number",
							min: "0",
							step: "0.01",
							inputMode: "decimal",
							value: form.data.counter_amount,
							onChange: (event) => form.setData("counter_amount", event.target.value),
							placeholder: "USD",
							"aria-invalid": Boolean(counterError),
							className: `portal-input sm:w-56${counterError ? " portal-input-error" : ""}`
						})]
					}),
					/* @__PURE__ */ jsx("button", {
						type: "submit",
						disabled: form.processing || form.data.counter_amount.trim() === "",
						className: "button-press focus-copper inline-flex h-10 items-center justify-center rounded-lg bg-[#a56437] px-5 font-heading text-sm font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
						children: "Send counter"
					}),
					counterError && /* @__PURE__ */ jsx("span", {
						className: "text-sm text-[#b3261e]",
						children: counterError
					})
				]
			})
		]
	});
}
var toneClasses = {
	neutral: "border-[#dad5cb] bg-[#f3f1ec] text-neutral-700",
	success: "border-emerald-800/25 bg-emerald-50 text-emerald-800",
	warning: "border-amber-800/25 bg-amber-50 text-amber-800",
	muted: "border-neutral-300 bg-neutral-100 text-neutral-500",
	danger: "border-[#b3261e]/25 bg-red-50 text-[#b3261e]"
};
function StatusBadge({ label, tone }) {
	return /* @__PURE__ */ jsx("span", {
		className: `inline-flex h-7 shrink-0 items-center rounded-full border px-3 font-heading text-xs font-semibold uppercase tracking-[0.12em] ${toneClasses[tone] ?? toneClasses.neutral}`,
		children: label
	});
}
function Detail({ label, children }) {
	return /* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
		className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-500",
		children: label
	}), /* @__PURE__ */ jsx("dd", {
		className: "mt-1",
		children
	})] });
}
function formatUSD(value) {
	const amount = Number(value);
	return Number.isNaN(amount) ? value : amount.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		maximumFractionDigits: 0
	});
}
var request_equipment_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	requestedAssets: [
		"Replacement units",
		"Project-specific equipment",
		"Hard-to-find specs",
		"Surplus field equipment",
		"Urgent operational needs"
	],
	processSteps: [
		{
			"number": "01",
			"title": "We check active inventory",
			"description": "Petra starts with equipment already moving through the brokerage network to see if the request can be filled right now."
		},
		{
			"number": "02",
			"title": "We contact regional sellers",
			"description": "We reach out directly to operators and sellers holding the kind of equipment the request calls for."
		},
		{
			"number": "03",
			"title": "We reach yard networks",
			"description": "Petra works surplus yards and private sellers where equipment often moves before it is ever listed publicly."
		},
		{
			"number": "04",
			"title": "We present real options",
			"description": "You get equipment that actually matches the spec, condition, location, and timeline you asked for."
		},
		{
			"number": "05",
			"title": "You choose next steps",
			"description": "If an option fits, Petra carries the conversation into pricing, inspection, documentation, and movement."
		}
	],
	requirements: [
		"Equipment type",
		"Specifications (if known)",
		"Budget range",
		"Location preference",
		"Timeline"
	],
	buyerBenefits: [
		{
			"title": "Specific Asset Sourcing",
			"description": "Petra is built for buyers who need a real fit, not a long list of irrelevant public listings."
		},
		{
			"title": "Quiet-Market Access",
			"description": "Some equipment moves through operator relationships and regional sellers before it ever reaches an open marketplace."
		},
		{
			"title": "Practical Verification",
			"description": "We focus on condition, specs, documentation, site fit, and logistics before a buyer wastes time."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Can Petra source equipment that is not listed publicly?",
			"answer": "Yes. Petra can review buyer requirements against active sellers, regional surplus, operator relationships, and quiet-market opportunities."
		},
		{
			"question": "What information should a buyer provide?",
			"answer": "The most useful details are equipment type, required specs, location needs, condition requirements, timing, budget range, and documentation needs."
		},
		{
			"question": "Does Petra only work in oilfield equipment?",
			"answer": "Petra focuses on used oilfield and industrial equipment, including compressors, separators, pump packages, tank batteries, production equipment, and related surplus assets."
		}
	]
};
//#endregion
//#region resources/js/Pages/RequestEquipment.tsx
var RequestEquipment_exports = /* @__PURE__ */ __exportAll({ default: () => RequestEquipment });
var { heroImage: heroImage$3, requestedAssets, processSteps, requirements, buyerBenefits, regions: regions$2, faqs: faqs$16 } = request_equipment_default;
var pageTitle$2 = "Request Equipment | Petra Equipment Sourcing";
var pageDescription$2 = "Most buyers do not need more listings. Petra helps source the right size, spec, condition, and equipment fit through people who know where to find it.";
function RequestEquipment({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Service",
			"@id": `${canonicalUrl}#equipment-sourcing-service`,
			name: "Used oilfield equipment sourcing for buyers",
			url: canonicalUrl,
			description: pageDescription$2,
			provider: {
				"@type": "Organization",
				name: "Petra",
				url: canonicalUrl.replace(/\/request-equipment$/, "")
			},
			areaServed: regions$2,
			serviceType: "Used oilfield and industrial equipment sourcing"
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/request-equipment$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Request Equipment",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$2,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$2
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
				content: pageTitle$2
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$2
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
				content: "Oilfield equipment yard represented by Petra for equipment sourcing."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$2
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$2
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
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "Looking for specific equipment? We source directly through regional networks instead of relying only on listings."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "#buyer-request",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Submit Request"
							}), /* @__PURE__ */ jsx("a", {
								href: "/equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "View Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mx-auto mb-9 max-w-3xl text-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]",
							children: "Equipment Requests"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl",
							children: "What We Help Source"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-2 gap-px bg-white/15 md:grid-cols-3 lg:grid-cols-5",
						children: requestedAssets.map((assetType) => /* @__PURE__ */ jsxs("div", {
							className: "bg-[#1c1a16] p-5 text-center transition-colors hover:bg-[#24211c]",
							children: [/* @__PURE__ */ jsx("div", { className: "mx-auto mb-4 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h3", {
								className: "font-heading text-lg font-semibold uppercase tracking-[0.08em] text-white",
								children: assetType
							})]
						}, assetType))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mb-12 max-w-3xl",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Sourcing Process"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "How Petra Sources Equipment"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-5",
						children: processSteps.map((step) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white p-7",
							children: [
								/* @__PURE__ */ jsx("span", {
									className: "font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]",
									children: step.number
								}),
								/* @__PURE__ */ jsx("h3", {
									className: "mt-8 font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: step.title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-base leading-7 text-neutral-600",
									children: step.description
								})
							]
						}, step.number))
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				id: "buyer-request",
				className: "bg-[#f3f1ec] py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl lg:col-span-5",
						children: [
							/* @__PURE__ */ jsx("span", {
								className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
								children: "Buyer Requirements"
							}),
							/* @__PURE__ */ jsx("h2", {
								className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
								children: "What to Include"
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mt-6 text-lg leading-8 text-neutral-600",
								children: "The more of this you can share up front, the faster we can work the network:"
							})
						]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsxs("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: [/* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
								children: requirements.map((requirement) => /* @__PURE__ */ jsxs("article", {
									className: "flex min-h-24 items-start gap-4 bg-white p-5",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-1 h-5 w-5 shrink-0"
									}), /* @__PURE__ */ jsx("h3", {
										className: "font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950",
										children: requirement
									})]
								}, requirement))
							}), /* @__PURE__ */ jsx("p", {
								className: "mt-6 border-t border-[#dad5cb] pt-6 text-lg leading-8 text-neutral-600",
								children: "Tell us what you're trying to source."
							})]
						})
					})]
				})
			})
		]
	})] });
}
var resources_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	intro: "Practical information for buyers and sellers working in real equipment markets.",
	topics: [
		"How to sell used oilfield equipment",
		"Equipment valuation basics",
		"Preparing equipment for sale",
		"Buying used equipment safely",
		"Market trends in regional energy sectors"
	],
	note: "Content is written for operators, not marketers."
};
//#endregion
//#region resources/js/Pages/Resources.tsx
var Resources_exports = /* @__PURE__ */ __exportAll({ default: () => Resources });
var { intro, topics, note } = resources_default;
var pageTitle$1 = "Resources | Petra";
var pageDescription$1 = "Market insights and guides for buyers and sellers working in real equipment markets. Content is written for operators, not marketers.";
function Resources({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "CollectionPage",
			"@id": `${canonicalUrl}#resources`,
			name: "Market Insights & Guides",
			url: canonicalUrl,
			description: pageDescription$1,
			isPartOf: {
				"@type": "WebSite",
				name: "Petra",
				url: canonicalUrl.replace(/\/resources$/, "")
			},
			about: topics
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/resources$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Resources",
				item: canonicalUrl
			}]
		}]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsxs(Head, {
		title: pageTitle$1,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: pageDescription$1
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
				content: pageTitle$1
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: pageDescription$1
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
				content: "Oilfield equipment yard represented by Petra brokerage."
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: pageTitle$1
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: pageDescription$1
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
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Market Insights & Guides"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: intro
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/sell-equipment",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Sell Equipment"
							}), /* @__PURE__ */ jsx("a", {
								href: "/request-equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Request Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white py-20 sm:py-24 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-5 sm:px-10 lg:grid-cols-12 lg:items-start lg:gap-14",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "max-w-3xl lg:col-span-5",
						children: [/* @__PURE__ */ jsx("span", {
							className: "mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] text-[#a56437]",
							children: "Guides"
						}), /* @__PURE__ */ jsx("h2", {
							className: "font-heading text-4xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-5xl",
							children: "Topics Include"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "lg:col-span-7",
						children: /* @__PURE__ */ jsx("div", {
							className: "border border-[#dad5cb] bg-white p-6 sm:p-8",
							children: /* @__PURE__ */ jsx("div", {
								className: "grid grid-cols-1 gap-px bg-[#dad5cb] sm:grid-cols-2",
								children: topics.map((topic) => /* @__PURE__ */ jsxs("article", {
									className: "flex min-h-24 items-start gap-4 bg-white p-5 sm:last:col-span-2",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-1 h-5 w-5 shrink-0"
									}), /* @__PURE__ */ jsx("h3", {
										className: "font-heading text-lg font-semibold uppercase leading-snug tracking-[0.08em] text-neutral-950",
										children: topic
									})]
								}, topic))
							})
						})
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: /* @__PURE__ */ jsx("p", {
						className: "mx-auto max-w-3xl text-center text-lg leading-8 text-white/75",
						children: note
					})
				})
			})
		]
	})] });
}
//#endregion
//#region resources/js/Components/public-form-fields.tsx
/**
* Field primitives shared by the two public Sell Equipment forms — the Equipment Submission
* form and Talk to a Broker. Extracted from public-submission-form.tsx when the second form
* landed, the same way file-pickers.tsx was lifted out of the seller portal.
*
* These are the public-site counterparts to the portal's form styling: same `portal-input`
* classes and copper error treatment, but laid out for a wide marketing page rather than a
* slide-over.
*/
function Legend({ children }) {
	return /* @__PURE__ */ jsx("legend", {
		className: "mb-1 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
		children
	});
}
function Field({ label, error, required = false, className = "", hint, children }) {
	return /* @__PURE__ */ jsxs("label", {
		className: `grid gap-2 ${className}`,
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: [label, required ? /* @__PURE__ */ jsx("span", {
					className: "ml-1 text-[#a56437]",
					children: "*"
				}) : /* @__PURE__ */ jsx("span", {
					className: "ml-2 text-neutral-400",
					children: "Optional"
				})]
			}),
			hint && /* @__PURE__ */ jsx("span", {
				className: "text-sm leading-6 text-neutral-500",
				children: hint
			}),
			children,
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			})
		]
	});
}
function RadioGroup({ legend, options, value, error, required = false, onChange, firstRef }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "group",
		className: "grid gap-3",
		children: [
			/* @__PURE__ */ jsxs("span", {
				className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
				children: [legend, required && /* @__PURE__ */ jsx("span", {
					className: "ml-1 text-[#a56437]",
					children: "*"
				})]
			}),
			/* @__PURE__ */ jsx("div", {
				className: "grid gap-2",
				children: Object.entries(options).map(([optionValue, label], index) => /* @__PURE__ */ jsxs("label", {
					className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
					children: [/* @__PURE__ */ jsx("input", {
						ref: index === 0 ? firstRef : void 0,
						type: "radio",
						name: legend,
						checked: value === optionValue,
						onChange: () => onChange(optionValue),
						className: "mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
					}), label]
				}, optionValue))
			}),
			error && /* @__PURE__ */ jsx("span", {
				className: "text-sm text-[#b3261e]",
				children: error
			})
		]
	});
}
function Consent({ label, checked, error, onChange, inputRef }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-1",
		children: [/* @__PURE__ */ jsxs("label", {
			className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
			children: [/* @__PURE__ */ jsx("input", {
				ref: inputRef,
				type: "checkbox",
				checked,
				onChange: (event) => onChange(event.target.checked),
				className: "mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
			}), /* @__PURE__ */ jsxs("span", { children: [label, /* @__PURE__ */ jsx("span", {
				className: "ml-1 text-[#a56437]",
				children: "*"
			})] })]
		}), error && /* @__PURE__ */ jsx("span", {
			className: "pl-7 text-sm text-[#b3261e]",
			children: error
		})]
	});
}
/**
* Hidden from people and from screen readers, tempting to bots. The controllers treat a
* filled `website` as spam and answer exactly as they would a real submission.
*/
function Honeypot({ value, onChange }) {
	return /* @__PURE__ */ jsx("div", {
		"aria-hidden": "true",
		className: "hidden",
		children: /* @__PURE__ */ jsxs("label", { children: ["Website", /* @__PURE__ */ jsx("input", {
			type: "text",
			tabIndex: -1,
			autoComplete: "off",
			value,
			onChange: (event) => onChange(event.target.value)
		})] })
	});
}
function inputClass(error) {
	return `portal-input${error ? " portal-input-error" : ""}`;
}
//#endregion
//#region resources/js/use-form-draft.ts
var WRITE_DELAY_MS = 400;
function useFormDraft(key, data, setData, { omit = [], enabled = true } = {}) {
	const hasRestored = useRef(false);
	const omitted = useRef(omit);
	omitted.current = omit;
	function serialisable(values) {
		const draft = {};
		Object.entries(values).forEach(([field, value]) => {
			if (omitted.current.includes(field)) return;
			if (value instanceof File || Array.isArray(value) && value.some((item) => item instanceof File)) return;
			draft[field] = value;
		});
		return draft;
	}
	useEffect(() => {
		if (!enabled) {
			hasRestored.current = true;
			return;
		}
		try {
			const stored = window.localStorage.getItem(key);
			if (stored) {
				const parsed = JSON.parse(stored);
				const restored = {};
				Object.keys(data).forEach((field) => {
					if (field in parsed && !omitted.current.includes(field)) restored[field] = parsed[field];
				});
				if (Object.keys(restored).length > 0) setData(restored);
			}
		} catch {
			clear();
		}
		hasRestored.current = true;
	}, []);
	useEffect(() => {
		if (!enabled || !hasRestored.current) return;
		const timer = window.setTimeout(() => {
			try {
				window.localStorage.setItem(key, JSON.stringify(serialisable(data)));
			} catch {}
		}, WRITE_DELAY_MS);
		return () => window.clearTimeout(timer);
	}, [
		key,
		data,
		enabled
	]);
	function clear() {
		try {
			window.localStorage.removeItem(key);
		} catch {}
	}
	return { clear };
}
//#endregion
//#region resources/js/Components/broker-contact-form.tsx
var DRAFT_KEY$1 = "petra:draft:contact-broker";
var REQUIRED_FIELDS = [
	{
		name: "full_name",
		message: "Enter your full name."
	},
	{
		name: "email",
		message: "Enter your email address."
	},
	{
		name: "phone",
		message: "Enter your phone number."
	},
	{
		name: "topic",
		message: "Let us know how we can help."
	},
	{
		name: "message",
		message: "Tell us a little about your equipment or question."
	},
	{
		name: "preferred_contact",
		message: "Choose how you would like us to reach you."
	},
	{
		name: "consent",
		message: "Please authorize Petra to contact you."
	}
];
function BrokerContactForm({ topicOptions, preferredContactOptions, inquirySent, copy, sidebar }) {
	const { auth } = usePage().props;
	const form = useForm({
		full_name: auth.user?.name ?? "",
		company: auth.user?.company_name ?? "",
		email: auth.user?.email ?? "",
		phone: auth.user?.phone ?? "",
		topic: "",
		equipment_type: "",
		message: "",
		preferred_contact: "",
		consent: false,
		website: ""
	});
	const [clientErrors, setClientErrors] = useState({});
	const fieldRefs = useRef({});
	const draft = useFormDraft(DRAFT_KEY$1, form.data, form.setData, {
		omit: ["website"],
		enabled: !inquirySent
	});
	function errorFor(field) {
		const serverErrors = form.errors;
		return clientErrors[field] ?? serverErrors[field];
	}
	function clearError(field) {
		setClientErrors((errors) => {
			if (!errors[field]) return errors;
			const next = { ...errors };
			delete next[field];
			return next;
		});
	}
	function isEmpty(field) {
		const value = form.data[field];
		return typeof value === "boolean" ? !value : !String(value ?? "").trim();
	}
	function submit(event) {
		event.preventDefault();
		const errors = {};
		REQUIRED_FIELDS.forEach((field) => {
			if (isEmpty(field.name)) errors[field.name] = field.message;
		});
		setClientErrors(errors);
		const firstInvalid = REQUIRED_FIELDS.find((field) => errors[field.name]);
		if (firstInvalid) {
			fieldRefs.current[firstInvalid.name]?.focus();
			fieldRefs.current[firstInvalid.name]?.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
			return;
		}
		form.post("/sell-equipment/contact-broker", { onSuccess: () => draft.clear() });
	}
	return /* @__PURE__ */ jsx("section", {
		id: "talk-to-a-broker-form",
		className: "border-b border-[#dad5cb] bg-white py-16 sm:py-20 lg:py-24",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-10 lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16",
			children: [/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("h2", {
				className: "font-heading text-3xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
				children: copy.title
			}), inquirySent ? /* @__PURE__ */ jsx(SuccessPanel, {
				title: copy.successTitle,
				body: copy.successBody
			}) : /* @__PURE__ */ jsxs(Fragment, { children: [
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-base leading-7 text-neutral-600",
					children: copy.intro
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm leading-6 text-neutral-500",
					children: copy.requiredNote
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					noValidate: true,
					className: "mt-10 grid gap-10",
					children: [
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [/* @__PURE__ */ jsx(Legend, { children: "Your Details" }), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.fullName,
										required: true,
										error: errorFor("full_name"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.full_name = element;
											},
											type: "text",
											value: form.data.full_name,
											onChange: (event) => {
												clearError("full_name");
												form.setData("full_name", event.target.value);
											},
											className: inputClass(errorFor("full_name"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.company,
										error: errorFor("company"),
										children: /* @__PURE__ */ jsx("input", {
											type: "text",
											value: form.data.company,
											onChange: (event) => form.setData("company", event.target.value),
											className: inputClass(errorFor("company"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.email,
										required: true,
										error: errorFor("email"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.email = element;
											},
											type: "email",
											value: form.data.email,
											onChange: (event) => {
												clearError("email");
												form.setData("email", event.target.value);
											},
											className: inputClass(errorFor("email"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.phone,
										required: true,
										error: errorFor("phone"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.phone = element;
											},
											type: "tel",
											value: form.data.phone,
											onChange: (event) => {
												clearError("phone");
												form.setData("phone", event.target.value);
											},
											className: inputClass(errorFor("phone"))
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: "How We Can Help" }),
								/* @__PURE__ */ jsx(Field, {
									label: copy.labels.topic,
									required: true,
									error: errorFor("topic"),
									children: /* @__PURE__ */ jsxs("select", {
										ref: (element) => {
											fieldRefs.current.topic = element;
										},
										value: form.data.topic,
										onChange: (event) => {
											clearError("topic");
											form.setData("topic", event.target.value);
										},
										className: inputClass(errorFor("topic")),
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Select an option"
										}), Object.entries(topicOptions).map(([value, label]) => /* @__PURE__ */ jsx("option", {
											value,
											children: label
										}, value))]
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: copy.labels.equipmentType,
									error: errorFor("equipment_type"),
									children: /* @__PURE__ */ jsx("input", {
										type: "text",
										placeholder: copy.placeholders.equipmentType,
										value: form.data.equipment_type,
										onChange: (event) => form.setData("equipment_type", event.target.value),
										className: inputClass(errorFor("equipment_type"))
									})
								}),
								/* @__PURE__ */ jsx(Field, {
									label: copy.labels.message,
									required: true,
									error: errorFor("message"),
									children: /* @__PURE__ */ jsx("textarea", {
										ref: (element) => {
											fieldRefs.current.message = element;
										},
										rows: 6,
										placeholder: copy.placeholders.message,
										value: form.data.message,
										onChange: (event) => {
											clearError("message");
											form.setData("message", event.target.value);
										},
										className: inputClass(errorFor("message"))
									})
								}),
								/* @__PURE__ */ jsx(RadioGroup, {
									legend: copy.labels.preferredContact,
									required: true,
									options: preferredContactOptions,
									value: form.data.preferred_contact,
									error: errorFor("preferred_contact"),
									onChange: (value) => {
										clearError("preferred_contact");
										form.setData("preferred_contact", value);
									},
									firstRef: (element) => {
										fieldRefs.current.preferred_contact = element;
									}
								})
							]
						}),
						/* @__PURE__ */ jsx(Consent, {
							label: copy.consent,
							checked: form.data.consent,
							error: errorFor("consent"),
							inputRef: (element) => {
								fieldRefs.current.consent = element;
							},
							onChange: (checked) => {
								clearError("consent");
								form.setData("consent", checked);
							}
						}),
						/* @__PURE__ */ jsx(Honeypot, {
							value: form.data.website,
							onChange: (value) => form.setData("website", value)
						}),
						/* @__PURE__ */ jsx("div", {
							className: "border-t border-[#dad5cb] pt-8",
							children: /* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: form.processing,
								className: "button-press inline-flex h-14 w-fit items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: form.processing ? "Sending…" : copy.submitLabel
							})
						})
					]
				})
			] })] }), /* @__PURE__ */ jsx(ContactSidebar, { copy: sidebar })]
		})
	});
}
function SuccessPanel({ title, body }) {
	return /* @__PURE__ */ jsxs("div", {
		role: "status",
		className: "mt-8 border-l-4 border-[#a56437] bg-[#f3f1ec] p-8",
		children: [/* @__PURE__ */ jsx("h3", {
			className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
			children: title
		}), /* @__PURE__ */ jsx("div", {
			className: "mt-4 space-y-3",
			children: body.map((paragraph) => /* @__PURE__ */ jsx("p", {
				className: "text-base leading-7 text-neutral-600",
				children: paragraph
			}, paragraph))
		})]
	});
}
/**
* The contact block beside the form. Every value comes from the shared `siteContact` prop
* (config/petra.php), so the phone number and address live in one place and can be corrected
* by an env var rather than a code change.
*/
function ContactSidebar({ copy }) {
	const { siteContact } = usePage().props;
	return /* @__PURE__ */ jsxs("aside", {
		className: "h-fit border border-[#dad5cb] bg-[#f3f1ec] p-8 lg:sticky lg:top-8",
		children: [
			/* @__PURE__ */ jsx("h3", {
				className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
				children: copy.title
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-4 text-base leading-7 text-neutral-600",
				children: copy.intro
			}),
			/* @__PURE__ */ jsx("h4", {
				className: "mt-8 font-heading text-sm font-semibold uppercase tracking-[0.16em] text-[#a56437]",
				children: copy.contactHeading
			}),
			/* @__PURE__ */ jsxs("dl", {
				className: "mt-4 grid gap-4",
				children: [
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: copy.phoneLabel
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-1 text-base leading-7 text-neutral-700",
						children: isDiallable(siteContact.phone) ? /* @__PURE__ */ jsx("a", {
							href: `tel:${telHref(siteContact.phone)}`,
							className: contactLinkClass,
							children: siteContact.phone
						}) : siteContact.phone
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: copy.emailLabel
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-1 break-words text-base leading-7 text-neutral-700",
						children: /* @__PURE__ */ jsx("a", {
							href: `mailto:${siteContact.email}`,
							className: contactLinkClass,
							children: siteContact.email
						})
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: copy.hoursLabel
					}), /* @__PURE__ */ jsxs("dd", {
						className: "mt-1 text-base leading-7 text-neutral-700",
						children: [
							siteContact.hours_days,
							/* @__PURE__ */ jsx("br", {}),
							siteContact.hours_time
						]
					})] }),
					/* @__PURE__ */ jsxs("div", { children: [/* @__PURE__ */ jsx("dt", {
						className: "font-heading text-xs font-semibold uppercase tracking-[0.12em] text-neutral-500",
						children: copy.serviceAreaLabel
					}), /* @__PURE__ */ jsx("dd", {
						className: "mt-2",
						children: /* @__PURE__ */ jsx("ul", {
							className: "grid gap-2",
							children: siteContact.service_area.map((area) => /* @__PURE__ */ jsxs("li", {
								className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
								children: [/* @__PURE__ */ jsx("span", {
									"aria-hidden": "true",
									className: "mt-3 h-1 w-1 shrink-0 bg-[#a56437]"
								}), area]
							}, area))
						})
					})] })
				]
			}),
			/* @__PURE__ */ jsx("p", {
				className: "mt-8 border-t border-[#dad5cb] pt-6 text-base leading-7 text-neutral-600",
				children: copy.closing
			})
		]
	});
}
var contactLinkClass = "font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950";
/**
* config/petra.php still defaults to the content doc's placeholder, "(307) XXX-XXXX". A
* tel: link to that is a dead affordance — worse than plain text, because it looks callable.
* Anything holding an X is treated as not yet supplied.
*/
function isDiallable(phone) {
	return phone.trim().length > 0 && !/x/i.test(phone);
}
function telHref(phone) {
	return phone.replace(/[^\d+]/g, "");
}
//#endregion
//#region resources/js/Components/faq-accordion.tsx
/**
* FAQPage structured data for a set of question/answer pairs.
*
* Answers are always present in the rendered DOM (the accordion hides collapsed panels with
* the `hidden` attribute rather than unmounting them), so this node describes markup that
* genuinely exists on the page.
*/
function faqPageNode(canonicalUrl, faqs) {
	return {
		"@type": "FAQPage",
		"@id": `${canonicalUrl}#faq`,
		mainEntity: faqs.map((faq) => ({
			"@type": "Question",
			name: faq.question,
			acceptedAnswer: {
				"@type": "Answer",
				text: faq.answer
			}
		}))
	};
}
/**
* Accessible disclosure list. Each question is an aria-expanded button controlling its own
* panel, and any number can be open at once — readers comparing two answers should not have
* one close as they open the other.
*/
function FaqAccordion({ faqs }) {
	const [openQuestions, setOpenQuestions] = useState([]);
	const baseId = useId();
	const toggle = (question) => setOpenQuestions((current) => current.includes(question) ? current.filter((item) => item !== question) : [...current, question]);
	return /* @__PURE__ */ jsx("div", {
		className: "border-t border-[#dad5cb]",
		children: faqs.map((faq, index) => {
			const isOpen = openQuestions.includes(faq.question);
			const buttonId = `${baseId}-q-${index}`;
			const panelId = `${baseId}-a-${index}`;
			return /* @__PURE__ */ jsxs("div", {
				className: "border-b border-[#dad5cb]",
				children: [/* @__PURE__ */ jsx("h3", { children: /* @__PURE__ */ jsxs("button", {
					type: "button",
					id: buttonId,
					"aria-expanded": isOpen,
					"aria-controls": panelId,
					onClick: () => toggle(faq.question),
					className: "flex w-full items-start justify-between gap-6 bg-transparent py-6 text-left transition-colors hover:text-[#a56437]",
					children: [/* @__PURE__ */ jsx("span", {
						className: "font-heading text-lg font-semibold uppercase tracking-[0.06em] text-neutral-950 sm:text-xl",
						children: faq.question
					}), /* @__PURE__ */ jsx("span", {
						"aria-hidden": "true",
						className: `mt-1 shrink-0 text-[#a56437] transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`,
						children: /* @__PURE__ */ jsx("svg", {
							width: "20",
							height: "20",
							viewBox: "0 0 20 20",
							fill: "none",
							stroke: "currentColor",
							strokeWidth: "2",
							children: /* @__PURE__ */ jsx("path", {
								d: "M5 7.5 10 12.5 15 7.5",
								strokeLinecap: "square"
							})
						})
					})]
				}) }), /* @__PURE__ */ jsx("div", {
					id: panelId,
					role: "region",
					"aria-labelledby": buttonId,
					hidden: !isOpen,
					children: /* @__PURE__ */ jsx("p", {
						className: "pb-6 pr-10 text-base leading-7 text-neutral-600",
						children: faq.answer
					})
				})]
			}, faq.question);
		})
	});
}
//#endregion
//#region resources/js/Components/public-page-meta.tsx
/**
* The head block every public page repeats: title, description, canonical, Open Graph,
* Twitter card, and a JSON-LD graph. Extracted while building the Sell Equipment section,
* where ten pages would otherwise carry ten copies of the same twelve tags.
*/
function PublicPageMeta({ title, description, canonicalUrl, ogImageUrl, ogImageAlt = "Oilfield equipment yard represented by Petra equipment brokerage.", noindex = false, structuredData }) {
	return /* @__PURE__ */ jsxs(Head, {
		title,
		children: [
			/* @__PURE__ */ jsx("meta", {
				name: "description",
				content: description
			}),
			/* @__PURE__ */ jsx("link", {
				rel: "canonical",
				href: canonicalUrl
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "robots",
				content: noindex ? "noindex, nofollow" : "index, follow"
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:title",
				content: title
			}),
			/* @__PURE__ */ jsx("meta", {
				property: "og:description",
				content: description
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
				content: ogImageAlt
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:card",
				content: "summary_large_image"
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:title",
				content: title
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:description",
				content: description
			}),
			/* @__PURE__ */ jsx("meta", {
				name: "twitter:image",
				content: ogImageUrl
			}),
			structuredData ? /* @__PURE__ */ jsx("script", {
				type: "application/ld+json",
				children: JSON.stringify(structuredData)
			}) : null
		]
	});
}
/**
* Origin of an absolute canonical URL. Sell Equipment nests two levels deep, so the
* older `canonicalUrl.replace(/\/sell-equipment$/, '')` trick no longer gets back to the
* site root.
*/
function siteOrigin(canonicalUrl) {
	try {
		return new URL(canonicalUrl).origin;
	} catch {
		return "";
	}
}
/**
* BreadcrumbList for a page under /sell-equipment. Pass the leaf's name and URL; Home and
* Sell Equipment are always the first two rungs. Omit the leaf for the section index.
*/
function breadcrumbNode(canonicalUrl, leaf) {
	const origin = siteOrigin(canonicalUrl);
	const trail = [
		{
			name: "Home",
			item: origin
		},
		{
			name: "Sell Equipment",
			item: `${origin}/sell-equipment`
		},
		...leaf ? [{
			name: leaf.name,
			item: leaf.url
		}] : []
	];
	return {
		"@type": "BreadcrumbList",
		"@id": `${canonicalUrl}#breadcrumbs`,
		itemListElement: trail.map((rung, index) => ({
			"@type": "ListItem",
			position: index + 1,
			name: rung.name,
			item: rung.item
		}))
	};
}
/**
* The Organization/Service node shared by the Sell Equipment pages.
*/
function sellEquipmentServiceNode(canonicalUrl, description) {
	return {
		"@type": "Service",
		"@id": `${canonicalUrl}#service`,
		name: "Used oilfield and industrial equipment brokerage for sellers",
		url: canonicalUrl,
		description,
		provider: {
			"@type": "Organization",
			name: "Petra",
			url: siteOrigin(canonicalUrl)
		},
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
		serviceType: "Used oilfield and industrial equipment brokerage"
	};
}
//#endregion
//#region resources/js/Components/sell-equipment-ui.tsx
function InlineLink({ label, href }) {
	return /* @__PURE__ */ jsx("a", {
		href,
		className: "font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950",
		children: label
	});
}
function RichText({ value, className }) {
	if (typeof value === "string") return /* @__PURE__ */ jsx("p", {
		className,
		children: value
	});
	return /* @__PURE__ */ jsxs("p", {
		className,
		children: [
			value.before,
			value.link ? /* @__PURE__ */ jsx(InlineLink, { ...value.link }) : null,
			value.middle,
			value.secondLink ? /* @__PURE__ */ jsx(InlineLink, { ...value.secondLink }) : null,
			value.after
		]
	});
}
function RichTextList({ items, className }) {
	return /* @__PURE__ */ jsx(Fragment, { children: items.map((item, index) => /* @__PURE__ */ jsx(RichText, {
		value: item,
		className
	}, index)) });
}
/** Copper eyebrow + heading, the section opener used across the public site. */
function SectionHeading({ eyebrow, title, children, tone = "light" }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "max-w-3xl",
		children: [
			eyebrow ? /* @__PURE__ */ jsx("span", {
				className: `mb-4 block font-heading text-sm font-semibold uppercase tracking-[0.2em] ${tone === "dark" ? "text-[#b06b3d]" : "text-[#a56437]"}`,
				children: eyebrow
			}) : null,
			/* @__PURE__ */ jsx("h2", {
				className: `font-heading text-3xl font-bold uppercase tracking-[0.08em] sm:text-4xl ${tone === "dark" ? "text-white" : "text-neutral-950"}`,
				children: title
			}),
			children
		]
	});
}
function Section({ children, background = "cream", id }) {
	return /* @__PURE__ */ jsx("section", {
		id,
		className: `${{
			cream: "border-b border-[#dad5cb] bg-[#f3f1ec]",
			white: "border-b border-[#dad5cb] bg-white",
			dark: "border-b border-[#dad5cb] bg-[#1c1a16] text-white"
		}[background]} py-16 sm:py-20 lg:py-24`,
		children: /* @__PURE__ */ jsx("div", {
			className: "mx-auto max-w-[1280px] px-5 sm:px-10",
			children
		})
	});
}
function PageHero({ title, subtitle, body, primaryCta, secondaryCta }) {
	return /* @__PURE__ */ jsx("section", {
		className: "border-b border-[#dad5cb] bg-white",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1280px] px-5 py-16 sm:px-10 sm:py-20 lg:py-24",
			children: [
				/* @__PURE__ */ jsx("h1", {
					className: "max-w-4xl font-hero text-[2.4rem] font-bold uppercase leading-[1.04] tracking-[0.08em] text-neutral-950 sm:text-[3.1rem] lg:text-[3.8rem]",
					children: title
				}),
				subtitle ? /* @__PURE__ */ jsx("p", {
					className: "mt-6 max-w-3xl font-heading text-xl font-semibold uppercase tracking-[0.06em] text-[#a56437] sm:text-2xl",
					children: subtitle
				}) : null,
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: body,
						className: "text-base font-medium leading-7 text-neutral-600 sm:text-lg"
					})
				}),
				primaryCta || secondaryCta ? /* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-col gap-4 sm:flex-row",
					children: [primaryCta ? /* @__PURE__ */ jsx(PrimaryButton, { ...primaryCta }) : null, secondaryCta ? /* @__PURE__ */ jsx(SecondaryButton, { ...secondaryCta }) : null]
				}) : null
			]
		})
	});
}
function PrimaryButton({ label, href }) {
	return /* @__PURE__ */ jsx("a", {
		href,
		className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
		children: label
	});
}
function SecondaryButton({ label, href, tone = "light" }) {
	return /* @__PURE__ */ jsx("a", {
		href,
		className: tone === "dark" ? "inline-flex h-14 items-center justify-center border border-white/40 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-colors hover:bg-white hover:text-neutral-950" : "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
		children: label
	});
}
/** Bulleted list rendered as check-marked rows. */
function CheckList({ items, columns = 2 }) {
	return /* @__PURE__ */ jsx("ul", {
		className: `mt-8 grid gap-px bg-[#dad5cb] ${{
			1: "grid-cols-1",
			2: "grid-cols-1 md:grid-cols-2",
			3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
		}[columns]}`,
		children: items.map((item) => /* @__PURE__ */ jsxs("li", {
			className: "flex items-start gap-4 bg-white p-5",
			children: [/* @__PURE__ */ jsx(FeatureIcon, {
				type: "check",
				className: "mt-0.5 h-5 w-5 shrink-0"
			}), /* @__PURE__ */ jsx("span", {
				className: "text-base leading-7 text-neutral-700",
				children: item
			})]
		}, item))
	});
}
/** Numbered process steps. Handles the 5-step and 7-step layouts from the doc. */
function NumberedSteps({ steps }) {
	return /* @__PURE__ */ jsx("ol", {
		className: "mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-3",
		children: steps.map((step, index) => /* @__PURE__ */ jsxs("li", {
			className: "bg-white p-7",
			children: [
				/* @__PURE__ */ jsx("span", {
					className: "font-heading text-3xl font-semibold uppercase tracking-[0.05em] text-[#a56437]",
					children: String(index + 1).padStart(2, "0")
				}),
				step.title ? /* @__PURE__ */ jsx("h3", {
					className: "mt-6 font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: step.title
				}) : null,
				step.text ? /* @__PURE__ */ jsx("p", {
					className: "mt-4 text-base leading-7 text-neutral-600",
					children: step.text
				}) : null,
				step.body ? /* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-3",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: step.body,
						className: "text-base leading-7 text-neutral-600"
					})
				}) : null,
				step.items ? /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2",
					children: step.items.map((item) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
						children: [/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "mt-3 h-1 w-1 shrink-0 bg-[#a56437]"
						}), item]
					}, item))
				}) : null,
				step.outro ? /* @__PURE__ */ jsx(RichText, {
					value: step.outro,
					className: "mt-4 text-base leading-7 text-neutral-600"
				}) : null
			]
		}, step.title ?? index))
	});
}
/** Titled cards with paragraphs and optional bullets — "What Makes Petra Different?" and friends. */
function CardGrid({ items, columns = 3 }) {
	return /* @__PURE__ */ jsx("div", {
		className: `mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] ${columns === 2 ? "md:grid-cols-2" : "md:grid-cols-2 lg:grid-cols-3"}`,
		children: items.map((item) => /* @__PURE__ */ jsxs("article", {
			className: "bg-white p-7",
			children: [
				/* @__PURE__ */ jsx("h3", {
					className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
					children: item.title
				}),
				item.body ? /* @__PURE__ */ jsx("div", {
					className: "mt-4 space-y-3",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: item.body,
						className: "text-base leading-7 text-neutral-600"
					})
				}) : null,
				item.items ? /* @__PURE__ */ jsx("ul", {
					className: "mt-4 space-y-2",
					children: item.items.map((entry) => /* @__PURE__ */ jsxs("li", {
						className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
						children: [/* @__PURE__ */ jsx("span", {
							"aria-hidden": "true",
							className: "mt-3 h-1 w-1 shrink-0 bg-[#a56437]"
						}), entry]
					}, entry))
				}) : null,
				item.outro ? /* @__PURE__ */ jsx(RichText, {
					value: item.outro,
					className: "mt-4 text-base leading-7 text-neutral-600"
				}) : null
			]
		}, item.title))
	});
}
/** Closing call-to-action band. */
function FinalCta({ title, body, primaryCta, secondaryCta, children }) {
	return /* @__PURE__ */ jsx("section", {
		className: "bg-[#1c1a16] py-16 text-white sm:py-20 lg:py-24",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[1280px] px-5 sm:px-10",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "max-w-3xl font-heading text-3xl font-bold uppercase tracking-[0.08em] text-white sm:text-4xl",
					children: title
				}),
				/* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: body,
						className: "text-base leading-7 text-white/70 sm:text-lg"
					})
				}),
				children,
				primaryCta || secondaryCta ? /* @__PURE__ */ jsxs("div", {
					className: "mt-10 flex flex-col gap-4 sm:flex-row",
					children: [primaryCta ? /* @__PURE__ */ jsx(PrimaryButton, { ...primaryCta }) : null, secondaryCta ? /* @__PURE__ */ jsx(SecondaryButton, {
						...secondaryCta,
						tone: "dark"
					}) : null]
				}) : null
			]
		})
	});
}
var contact_broker_default = {
	meta: {
		"title": "Talk to an Equipment Broker | Used Oilfield Equipment | Petra",
		"description": "Talk with a Petra equipment broker about selling used oilfield or industrial equipment, requesting a valuation, or finding qualified buyers across Wyoming and the Rockies."
	},
	hero: {
		"title": "Contact a Broker",
		"subtitle": "Let's Talk About Your Equipment",
		"body": [
			"Whether you're thinking about selling used oilfield equipment, wondering what your equipment may be worth, or simply looking for straightforward advice, Petra is here to help.",
			"You don't need to have every detail figured out before reaching out. Sometimes the best first step is simply having a conversation with someone who understands the equipment market.",
			"Our brokers work with equipment owners, operators, contractors, and buyers throughout Wyoming, the Rockies, and surrounding producing regions to provide honest guidance based on your equipment, your goals, and current market conditions."
		],
		"primaryCta": {
			"label": "Talk to a Broker",
			"href": "#talk-to-a-broker-form"
		}
	},
	whenToTalk: {
		"title": "When Should You Talk to a Broker?",
		"intro": ["You don't have to be ready to sell before contacting Petra.", "Many conversations begin with questions, not commitments."],
		"items": [
			{
				"title": "You're Thinking About Selling",
				"body": ["Not sure if now is the right time?", "We'll help you understand your options and discuss current market conditions."],
				"outro": {
					"before": "If you're already ready to begin, you can ",
					"link": {
						"label": "Submit Your Equipment",
						"href": "/sell-equipment/equipment-submission"
					},
					"after": " for review at any time."
				}
			},
			{
				"title": "You're Unsure What Your Equipment May Be Worth",
				"body": ["If you're evaluating whether to sell, we'll explain the factors that influence market value and help you determine the best next step."],
				"outro": {
					"before": "If you're still evaluating your options, start with a ",
					"link": {
						"label": "Request a Market-Based Valuation",
						"href": "/sell-equipment/request-valuation"
					},
					"after": " before deciding how you'd like to proceed."
				}
			},
			{
				"title": "You're Looking for the Right Buyer",
				"body": ["Finding qualified buyers takes more than posting a listing.", "We'll explain how Petra markets equipment and connects sellers with buyers across our regional network."]
			},
			{
				"title": "You Need Market Insight",
				"body": ["Equipment values and buyer demand change over time.", "We'll provide practical guidance based on today's market—not guesswork."]
			},
			{
				"title": "You Have Questions About the Brokerage Process",
				"body": ["If you're unsure how the process works, we'll walk you through it and explain what to expect before you make any decisions."],
				"outro": {
					"before": "We'll answer your questions and explain what to expect throughout the brokerage process. If you'd like to review the process beforehand, explore our ",
					"link": {
						"label": "Seller Process",
						"href": "/sell-equipment/seller-process"
					},
					"after": "."
				}
			},
			{
				"title": "You're Looking for Specific Equipment",
				"body": ["If you're searching for a compressor, separator, generator, production package, or other industrial equipment, we can help you source equipment through our brokerage network."]
			}
		]
	},
	duringConversation: {
		"title": "What Happens During the Conversation?",
		"intro": [
			"Our goal isn't to pressure you into making a decision.",
			"It's to help you better understand your options.",
			"During your conversation with Petra, we'll:"
		],
		"items": [
			"Learn about your equipment or project",
			"Answer your questions",
			"Discuss current market conditions",
			"Explain how the brokerage process works",
			"Recommend practical next steps based on your goals"
		],
		"outro": ["If you're ready to move forward, we'll guide you through the appropriate process.", "If you're still evaluating your options, that's perfectly fine too."]
	},
	whatToHaveReady: {
		"title": "What Should You Have Ready?",
		"intro": ["You don't need every detail before reaching out.", "Helpful information may include:"],
		"items": [
			"Equipment type",
			"Manufacturer and model",
			"General location",
			"Equipment condition",
			"Photos (if available)",
			"Supporting documents (if available)",
			"Any questions you'd like to discuss"
		],
		"outro": "Even if you only have basic information, we're happy to start the conversation."
	},
	whyOwnersChoose: {
		"title": "Why Equipment Owners Choose to Talk With Petra",
		"items": [
			{
				"title": "Honest Guidance",
				"body": ["We'll provide straightforward recommendations based on your equipment and today's market."]
			},
			{
				"title": "Regional Market Knowledge",
				"body": ["We understand the equipment markets across Wyoming, the Rockies, and surrounding producing regions."]
			},
			{
				"title": "Practical Brokerage Experience",
				"body": ["Our team understands the challenges of buying and selling used oilfield and industrial equipment."]
			},
			{
				"title": "Qualified Buyer Network",
				"body": ["We focus on connecting sellers with serious buyers rather than relying solely on public listings."]
			},
			{
				"title": "No Pressure",
				"body": ["A conversation with Petra doesn't obligate you to sell your equipment.", "Sometimes the right decision is simply having more information before moving forward."]
			}
		]
	},
	faqSection: {
		"title": "Frequently Asked Questions",
		"outro": {
			"before": "Looking for additional answers before reaching out? Visit our ",
			"link": {
				"label": "Sell Equipment FAQs",
				"href": "/sell-equipment/faqs"
			},
			"after": "."
		}
	},
	faqs: [
		{
			"question": "Do I need to submit equipment before talking to a broker?",
			"answer": "No. You're welcome to contact Petra at any point, whether you're gathering information or ready to begin the brokerage process."
		},
		{
			"question": "Is there a cost to speak with a broker?",
			"answer": "No. Initial conversations are simply an opportunity to discuss your equipment, answer questions, and understand your goals."
		},
		{
			"question": "What if I'm not ready to sell yet?",
			"answer": "That's completely fine. Many equipment owners contact Petra early in the decision-making process to better understand their options before making any commitments."
		},
		{
			"question": "Can buyers also contact Petra?",
			"answer": "Yes. Petra works with both buyers and sellers throughout the equipment brokerage process."
		},
		{
			"question": "What happens after our conversation?",
			"answer": "If moving forward makes sense, we'll recommend the appropriate next step, whether that's requesting a valuation, submitting equipment, sourcing equipment, or continuing the discussion as your plans develop."
		}
	],
	startConversation: {
		"title": "Let's Start the Conversation",
		"body": [
			"Every equipment owner has different goals, and every transaction begins with a conversation.",
			"Whether you're selling one asset, managing surplus equipment, searching for equipment, or simply looking for honest advice, Petra is here to help.",
			"Let's talk about your equipment, answer your questions, and help you determine the best path forward."
		],
		"primaryCta": {
			"label": "Talk to a Broker",
			"href": "#talk-to-a-broker-form"
		},
		"secondaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		}
	},
	form: {
		"title": "Talk to a Broker",
		"intro": "You don't need to know exactly what your equipment is worth or whether you're ready to sell. Start with a conversation, and we'll help you determine the most appropriate next step based on your goals.",
		"requiredNote": "Fields marked with * are required.",
		"labels": {
			"fullName": "Full Name",
			"company": "Company Name",
			"email": "Email Address",
			"phone": "Phone Number",
			"topic": "How Can We Help You?",
			"equipmentType": "Equipment Type (if applicable)",
			"message": "Message",
			"preferredContact": "Preferred Contact Method"
		},
		"placeholders": {
			"equipmentType": "Example: CAT Generator, Separator, Pump Package",
			"message": "Tell us about your equipment or let us know how we can help."
		},
		"consent": "I authorize Petra to contact me regarding my inquiry.",
		"submitLabel": "Talk to a Broker",
		"successTitle": "Thank You!",
		"successBody": ["Your inquiry has been received.", "A Petra broker will review your message and follow up using your preferred contact method."]
	},
	sidebar: {
		"title": "Let's Talk About Your Equipment",
		"intro": "Whether you're thinking about selling equipment, looking for a specific asset, or simply have questions about the brokerage process, our team is here to help.",
		"contactHeading": "Contact Information",
		"phoneLabel": "Phone",
		"emailLabel": "Email",
		"hoursLabel": "Business Hours",
		"serviceAreaLabel": "Service Area",
		"closing": "Not sure where to start? That's okay."
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/ContactBroker.tsx
var ContactBroker_exports = /* @__PURE__ */ __exportAll({ default: () => ContactBroker });
var { meta: meta$16, hero: hero$16, whenToTalk, duringConversation, whatToHaveReady, whyOwnersChoose, form: form$2, sidebar, faqSection: faqSection$12, faqs: faqs$14, startConversation } = contact_broker_default;
function ContactBroker({ canonicalUrl, ogImageUrl, topicOptions, preferredContactOptions, inquirySent }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			{
				"@type": "ContactPage",
				"@id": `${canonicalUrl}#contact`,
				name: meta$16.title,
				url: canonicalUrl,
				description: meta$16.description,
				isPartOf: {
					"@type": "WebSite",
					url: siteOrigin(canonicalUrl)
				}
			},
			breadcrumbNode(canonicalUrl, {
				name: "Contact a Broker",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$14)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$16.title,
		description: meta$16.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$16 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Good Reasons",
						title: whenToTalk.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whenToTalk.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CardGrid, {
						items: whenToTalk.items,
						columns: 3
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "No Pressure",
						title: duringConversation.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: duringConversation.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: duringConversation.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: duringConversation.outro,
							className: "text-base leading-7 text-neutral-600"
						})
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Preparation",
						title: whatToHaveReady.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whatToHaveReady.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whatToHaveReady.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: whatToHaveReady.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Why Petra",
					title: whyOwnersChoose.title
				}), /* @__PURE__ */ jsx(CardGrid, {
					items: whyOwnersChoose.items,
					columns: 3
				})]
			}),
			/* @__PURE__ */ jsx(BrokerContactForm, {
				topicOptions,
				preferredContactOptions,
				inquirySent,
				copy: form$2,
				sidebar
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection$12.title
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10 max-w-4xl",
					children: [/* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$14 }), /* @__PURE__ */ jsx(RichText, {
						value: faqSection$12.outro,
						className: "mt-8 text-base leading-7 text-neutral-600"
					})]
				})]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...startConversation })
		]
	})] });
}
//#endregion
//#region resources/js/Components/public-submission-form.tsx
var DRAFT_KEY = "petra:draft:equipment-submission";
function emptyForm() {
	return {
		full_name: "",
		company: "",
		email: "",
		phone: "",
		category: "",
		description: "",
		quantity: "1",
		location: "",
		condition: "",
		is_owner: "",
		intent: [],
		availability: "",
		estimated_value_range: "",
		additional_info: "",
		consent_accuracy: false,
		consent_contact: false,
		photos: [],
		documents: [],
		website: ""
	};
}
function PublicSubmissionForm({ categoryOptions, locationOptions, conditionOptions, ownershipOptions, intentOptions, availabilityOptions, valueRangeOptions, copy }) {
	const { auth } = usePage().props;
	const isSeller = auth.user?.user_type === "seller";
	const form = useForm({
		...emptyForm(),
		full_name: auth.user && !isSeller ? auth.user.name : "",
		email: auth.user && !isSeller ? auth.user.email : "",
		phone: auth.user && !isSeller ? auth.user.phone ?? "" : "",
		company: auth.user && !isSeller ? auth.user.company_name ?? "" : ""
	});
	const [clientErrors, setClientErrors] = useState({});
	const fieldRefs = useRef({});
	const draft = useFormDraft(DRAFT_KEY, form.data, form.setData, { omit: [
		"photos",
		"documents",
		"website"
	] });
	const requiredFields = [
		...isSeller ? [] : [
			{
				name: "full_name",
				message: "Enter your full name."
			},
			{
				name: "company",
				message: "Enter your company name."
			},
			{
				name: "email",
				message: "Enter your email address."
			},
			{
				name: "phone",
				message: "Enter your phone number."
			}
		],
		{
			name: "category",
			message: "Select an equipment category."
		},
		{
			name: "description",
			message: "Tell us what you are selling."
		},
		{
			name: "quantity",
			message: "Enter a quantity."
		},
		{
			name: "location",
			message: "Select the equipment location."
		},
		{
			name: "condition",
			message: "Select the general condition."
		},
		{
			name: "is_owner",
			message: "Let us know if you own the equipment."
		},
		{
			name: "intent",
			message: "Select at least one option."
		},
		{
			name: "availability",
			message: "Let us know if the equipment is available."
		},
		{
			name: "consent_accuracy",
			message: "Please confirm the information is accurate."
		},
		{
			name: "consent_contact",
			message: "Please authorize Petra to contact you."
		}
	];
	function errorFor(field) {
		const serverErrors = form.errors;
		return clientErrors[field] ?? serverErrors[field];
	}
	function clearError(field) {
		setClientErrors((errors) => {
			if (!errors[field]) return errors;
			const next = { ...errors };
			delete next[field];
			return next;
		});
	}
	function isEmpty(field) {
		const value = form.data[field];
		if (typeof value === "boolean") return !value;
		if (Array.isArray(value)) return value.length === 0;
		return !String(value ?? "").trim();
	}
	function submit(event) {
		event.preventDefault();
		const errors = {};
		requiredFields.forEach((field) => {
			if (isEmpty(field.name)) errors[field.name] = field.message;
		});
		setClientErrors(errors);
		const firstInvalid = requiredFields.find((field) => errors[field.name]);
		if (firstInvalid) {
			fieldRefs.current[firstInvalid.name]?.focus();
			fieldRefs.current[firstInvalid.name]?.scrollIntoView({
				block: "center",
				behavior: "smooth"
			});
			return;
		}
		form.post("/sell-equipment/equipment-submission", {
			forceFormData: true,
			onSuccess: () => draft.clear()
		});
	}
	function toggleIntent(value) {
		clearError("intent");
		form.setData("intent", form.data.intent.includes(value) ? form.data.intent.filter((entry) => entry !== value) : [...form.data.intent, value]);
	}
	const locationGroups = Array.from(new Set(locationOptions.map((option) => option.group)));
	return /* @__PURE__ */ jsx("section", {
		id: "equipment-submission-form",
		className: "border-b border-[#dad5cb] bg-white py-16 sm:py-20 lg:py-24",
		children: /* @__PURE__ */ jsxs("div", {
			className: "mx-auto max-w-[900px] px-5 sm:px-10",
			children: [
				/* @__PURE__ */ jsx("h2", {
					className: "font-heading text-3xl font-bold uppercase tracking-[0.08em] text-neutral-950 sm:text-4xl",
					children: copy.title
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 font-heading text-lg font-semibold uppercase tracking-[0.06em] text-[#a56437]",
					children: copy.subtitle
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-4 text-base leading-7 text-neutral-600",
					children: copy.intro
				}),
				/* @__PURE__ */ jsx("p", {
					className: "mt-2 text-sm leading-6 text-neutral-500",
					children: copy.requiredNote
				}),
				/* @__PURE__ */ jsxs("form", {
					onSubmit: submit,
					noValidate: true,
					className: "mt-10 grid gap-10",
					children: [
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [/* @__PURE__ */ jsx(Legend, { children: copy.sections.contact }), isSeller ? /* @__PURE__ */ jsxs("p", {
								className: "border border-[#dad5cb] bg-[#f3f1ec] p-5 text-base leading-7 text-neutral-700",
								children: [
									"Submitting as ",
									/* @__PURE__ */ jsx("strong", {
										className: "font-semibold",
										children: auth.user?.name
									}),
									" (",
									auth.user?.email,
									"). This listing will appear in your portal under My Listings."
								]
							}) : /* @__PURE__ */ jsxs("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.fullName,
										required: true,
										error: errorFor("full_name"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.full_name = element;
											},
											type: "text",
											value: form.data.full_name,
											onChange: (event) => {
												clearError("full_name");
												form.setData("full_name", event.target.value);
											},
											className: inputClass(errorFor("full_name"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.company,
										required: true,
										error: errorFor("company"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.company = element;
											},
											type: "text",
											value: form.data.company,
											onChange: (event) => {
												clearError("company");
												form.setData("company", event.target.value);
											},
											className: inputClass(errorFor("company"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.email,
										required: true,
										error: errorFor("email"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.email = element;
											},
											type: "email",
											value: form.data.email,
											onChange: (event) => {
												clearError("email");
												form.setData("email", event.target.value);
											},
											className: inputClass(errorFor("email"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.phone,
										required: true,
										error: errorFor("phone"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.phone = element;
											},
											type: "tel",
											value: form.data.phone,
											onChange: (event) => {
												clearError("phone");
												form.setData("phone", event.target.value);
											},
											className: inputClass(errorFor("phone"))
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [/* @__PURE__ */ jsx(Legend, { children: copy.sections.equipment }), /* @__PURE__ */ jsxs("div", {
								className: "grid gap-5 sm:grid-cols-2",
								children: [
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.category,
										required: true,
										error: errorFor("category"),
										children: /* @__PURE__ */ jsxs("select", {
											ref: (element) => {
												fieldRefs.current.category = element;
											},
											value: form.data.category,
											onChange: (event) => {
												clearError("category");
												form.setData("category", event.target.value);
											},
											className: inputClass(errorFor("category")),
											children: [/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Select a category"
											}), categoryOptions.map((category) => /* @__PURE__ */ jsx("option", {
												value: category,
												children: category
											}, category))]
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.quantity,
										required: true,
										error: errorFor("quantity"),
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.quantity = element;
											},
											type: "number",
											min: 1,
											step: 1,
											value: form.data.quantity,
											onChange: (event) => {
												clearError("quantity");
												form.setData("quantity", event.target.value);
											},
											className: inputClass(errorFor("quantity"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.description,
										required: true,
										error: errorFor("description"),
										className: "sm:col-span-2",
										hint: copy.hints.description,
										children: /* @__PURE__ */ jsx("input", {
											ref: (element) => {
												fieldRefs.current.description = element;
											},
											type: "text",
											placeholder: copy.hints.descriptionPlaceholder,
											value: form.data.description,
											onChange: (event) => {
												clearError("description");
												form.setData("description", event.target.value);
											},
											className: inputClass(errorFor("description"))
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.location,
										required: true,
										error: errorFor("location"),
										children: /* @__PURE__ */ jsxs("select", {
											ref: (element) => {
												fieldRefs.current.location = element;
											},
											value: form.data.location,
											onChange: (event) => {
												clearError("location");
												form.setData("location", event.target.value);
											},
											className: inputClass(errorFor("location")),
											children: [/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Select a location"
											}), locationGroups.map((group) => /* @__PURE__ */ jsx("optgroup", {
												label: group,
												children: locationOptions.filter((option) => option.group === group).map((option) => /* @__PURE__ */ jsx("option", {
													value: option.value,
													children: option.label
												}, option.value))
											}, group))]
										})
									}),
									/* @__PURE__ */ jsx(Field, {
										label: copy.labels.condition,
										required: true,
										error: errorFor("condition"),
										children: /* @__PURE__ */ jsxs("select", {
											ref: (element) => {
												fieldRefs.current.condition = element;
											},
											value: form.data.condition,
											onChange: (event) => {
												clearError("condition");
												form.setData("condition", event.target.value);
											},
											className: inputClass(errorFor("condition")),
											children: [/* @__PURE__ */ jsx("option", {
												value: "",
												children: "Select a condition"
											}), Object.entries(conditionOptions).map(([value, label]) => /* @__PURE__ */ jsx("option", {
												value,
												children: label
											}, value))]
										})
									})
								]
							})]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-6",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: copy.sections.selling }),
								/* @__PURE__ */ jsx(RadioGroup, {
									legend: copy.labels.isOwner,
									required: true,
									options: ownershipOptions,
									value: form.data.is_owner,
									error: errorFor("is_owner"),
									onChange: (value) => {
										clearError("is_owner");
										form.setData("is_owner", value);
									},
									firstRef: (element) => {
										fieldRefs.current.is_owner = element;
									}
								}),
								/* @__PURE__ */ jsxs("div", {
									className: "grid gap-3",
									children: [
										/* @__PURE__ */ jsx("span", {
											className: "font-heading text-sm font-semibold uppercase tracking-[0.12em] text-neutral-700",
											children: copy.labels.intent
										}),
										/* @__PURE__ */ jsx("span", {
											className: "text-sm leading-6 text-neutral-500",
											children: copy.hints.intent
										}),
										/* @__PURE__ */ jsx("div", {
											className: "grid gap-2",
											children: Object.entries(intentOptions).map(([value, label], index) => /* @__PURE__ */ jsxs("label", {
												className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
												children: [/* @__PURE__ */ jsx("input", {
													ref: index === 0 ? (element) => {
														fieldRefs.current.intent = element;
													} : void 0,
													type: "checkbox",
													checked: form.data.intent.includes(value),
													onChange: () => toggleIntent(value),
													className: "mt-1.5 h-4 w-4 shrink-0 accent-[#a56437]"
												}), label]
											}, value))
										}),
										errorFor("intent") && /* @__PURE__ */ jsx("span", {
											className: "text-sm text-[#b3261e]",
											children: errorFor("intent")
										})
									]
								}),
								/* @__PURE__ */ jsx(RadioGroup, {
									legend: copy.labels.availability,
									required: true,
									options: availabilityOptions,
									value: form.data.availability,
									error: errorFor("availability"),
									onChange: (value) => {
										clearError("availability");
										form.setData("availability", value);
									},
									firstRef: (element) => {
										fieldRefs.current.availability = element;
									}
								}),
								/* @__PURE__ */ jsx(Field, {
									label: copy.labels.estimatedValue,
									error: errorFor("estimated_value_range"),
									children: /* @__PURE__ */ jsxs("select", {
										value: form.data.estimated_value_range,
										onChange: (event) => form.setData("estimated_value_range", event.target.value),
										className: inputClass(errorFor("estimated_value_range")),
										children: [/* @__PURE__ */ jsx("option", {
											value: "",
											children: "Select a range"
										}), Object.entries(valueRangeOptions).map(([value, label]) => /* @__PURE__ */ jsx("option", {
											value,
											children: label
										}, value))]
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: copy.sections.photos }),
								/* @__PURE__ */ jsx("p", {
									className: "text-base leading-7 text-neutral-600",
									children: copy.hints.photos
								}),
								/* @__PURE__ */ jsx(HelpfulList, {
									intro: copy.hints.photosHelpful,
									items: copy.hints.photoItems
								}),
								/* @__PURE__ */ jsx(PhotoPicker, {
									files: form.data.photos,
									error: errorFor("photos"),
									onChange: (files) => form.setData("photos", files),
									label: copy.sections.photos,
									hint: copy.hints.photos
								}),
								/* @__PURE__ */ jsx(GuidePrompt, {
									prompt: copy.hints.photoGuidePrompt,
									link: copy.guideLinks.photos
								})
							]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: copy.sections.documents }),
								/* @__PURE__ */ jsx("p", {
									className: "text-base leading-7 text-neutral-600",
									children: copy.hints.documents
								}),
								/* @__PURE__ */ jsx(HelpfulList, {
									intro: copy.hints.documentsHelpful,
									items: copy.hints.documentItems
								}),
								/* @__PURE__ */ jsx(DocumentPicker, {
									files: form.data.documents,
									error: errorFor("documents"),
									onChange: (files) => form.setData("documents", files),
									label: copy.sections.documents,
									hint: copy.hints.documents
								}),
								/* @__PURE__ */ jsx(GuidePrompt, {
									prompt: copy.hints.documentGuidePrompt,
									link: copy.guideLinks.documents
								})
							]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-5",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: copy.sections.additional }),
								/* @__PURE__ */ jsx(HelpfulList, {
									intro: "Examples:",
									items: copy.hints.additionalInfoExamples
								}),
								/* @__PURE__ */ jsx(Field, {
									label: copy.labels.additionalInfo,
									error: errorFor("additional_info"),
									children: /* @__PURE__ */ jsx("textarea", {
										rows: 5,
										value: form.data.additional_info,
										onChange: (event) => form.setData("additional_info", event.target.value),
										className: inputClass(errorFor("additional_info"))
									})
								})
							]
						}),
						/* @__PURE__ */ jsxs("fieldset", {
							className: "grid gap-4",
							children: [
								/* @__PURE__ */ jsx(Legend, { children: copy.sections.confirmation }),
								/* @__PURE__ */ jsx(Consent, {
									label: copy.consent.accuracy,
									checked: form.data.consent_accuracy,
									error: errorFor("consent_accuracy"),
									inputRef: (element) => {
										fieldRefs.current.consent_accuracy = element;
									},
									onChange: (checked) => {
										clearError("consent_accuracy");
										form.setData("consent_accuracy", checked);
									}
								}),
								/* @__PURE__ */ jsx(Consent, {
									label: copy.consent.contact,
									checked: form.data.consent_contact,
									error: errorFor("consent_contact"),
									inputRef: (element) => {
										fieldRefs.current.consent_contact = element;
									},
									onChange: (checked) => {
										clearError("consent_contact");
										form.setData("consent_contact", checked);
									}
								})
							]
						}),
						/* @__PURE__ */ jsx(Honeypot, {
							value: form.data.website,
							onChange: (value) => form.setData("website", value)
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "grid gap-4 border-t border-[#dad5cb] pt-8",
							children: [/* @__PURE__ */ jsx("button", {
								type: "submit",
								disabled: form.processing,
								className: "button-press inline-flex h-14 w-fit items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90 disabled:opacity-60",
								children: form.processing ? "Submitting…" : copy.submitLabel
							}), /* @__PURE__ */ jsx("p", {
								className: "text-sm leading-6 text-neutral-500",
								children: copy.supportingText
							})]
						})
					]
				})
			]
		})
	});
}
function HelpfulList({ intro, items }) {
	return /* @__PURE__ */ jsxs("div", {
		className: "grid gap-2",
		children: [/* @__PURE__ */ jsx("span", {
			className: "text-sm font-semibold text-neutral-700",
			children: intro
		}), /* @__PURE__ */ jsx("ul", {
			className: "grid gap-1",
			children: items.map((item) => /* @__PURE__ */ jsxs("li", {
				className: "flex items-start gap-3 text-sm leading-6 text-neutral-600",
				children: [/* @__PURE__ */ jsx("span", {
					"aria-hidden": "true",
					className: "mt-2.5 h-1 w-1 shrink-0 bg-[#a56437]"
				}), item]
			}, item))
		})]
	});
}
/**
* Guide links open in a new tab on purpose: the visitor keeps this form mounted, so the
* files they already chose are still attached when they come back.
*/
function GuidePrompt({ prompt, link }) {
	return /* @__PURE__ */ jsxs("p", {
		className: "text-sm leading-6 text-neutral-600",
		children: [
			prompt,
			" ",
			/* @__PURE__ */ jsx("a", {
				href: link.href,
				target: "_blank",
				rel: "noopener",
				className: "font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950",
				children: link.label
			})
		]
	});
}
var equipment_submission_default = {
	meta: {
		"title": "Equipment Submission | Submit Oilfield Equipment | Petra",
		"description": "Submit your used oilfield and industrial equipment to Petra for brokerage review. Provide equipment details, photos, and documents to connect with qualified buyers."
	},
	hero: {
		"title": "Equipment Submission",
		"subtitle": "Submit Your Used Oilfield & Industrial Equipment",
		"body": [
			"Ready to sell your equipment?",
			"Provide the information you have, and Petra will review your submission to determine how your equipment fits within the current market.",
			"You don't need perfect documentation or professional photos to get started. Simply provide the available details, and we'll guide you through the next steps."
		],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "#equipment-submission-form"
		}
	},
	whatToInclude: {
		"title": "What Information Should You Include?",
		"body": ["The more information you can provide, the easier it is for us to evaluate your equipment and identify qualified buyers.", "If some information isn't available, that's okay. Submit what you have, and we'll discuss anything else that's needed."],
		"groups": [
			{
				"title": "Equipment Information",
				"intro": ["Help us understand what you're selling.", "Include information such as:"],
				"items": [
					"Equipment type",
					"Manufacturer",
					"Model",
					"Year (if known)",
					"Capacity or specifications",
					"Serial number (if available)"
				],
				"outro": "This information helps us identify the most relevant buyers."
			},
			{
				"title": "Equipment Location",
				"intro": ["Tell us where the equipment is currently located.", "Examples include:"],
				"items": [
					"Wyoming",
					"Colorado",
					"North Dakota",
					"Utah",
					"Montana",
					"Other producing regions"
				],
				"outro": "Knowing the equipment location helps us evaluate transportation logistics and regional buyer demand."
			},
			{
				"title": "Equipment Condition",
				"intro": ["Give us a general overview of its condition.", "Examples include:"],
				"items": [
					"Currently operating",
					"Idle equipment",
					"Stored in yard",
					"Removed from service",
					"Requires repair",
					"Unknown condition"
				],
				"outro": "You don't need a formal inspection before submitting your equipment."
			},
			{
				"title": "Upload Photos",
				"intro": ["Photos help us evaluate your equipment and present it accurately to qualified buyers.", "If available, include:"],
				"items": [
					"Overall equipment photos",
					"Multiple angles",
					"Equipment nameplates",
					"Control panels",
					"Interior components",
					"Any visible wear or damage"
				],
				"outro": "Don't worry about professional photography. Clear photos taken with your phone are usually enough to get started.",
				"guideLink": {
					"label": "View the Equipment Photo Guide",
					"href": "/sell-equipment/upload-photos"
				}
			},
			{
				"title": "Upload Documents",
				"intro": ["Supporting documents help us verify equipment details and answer buyer questions more efficiently.", "Helpful documents include:"],
				"items": [
					"Inspection reports",
					"Maintenance records",
					"Specification sheets",
					"Equipment manuals",
					"Service history",
					"Operating records"
				],
				"outro": "If documentation isn't available, you can still submit your equipment for review.",
				"guideLink": {
					"label": "View the Equipment Documentation Guide",
					"href": "/sell-equipment/upload-documents"
				}
			}
		]
	},
	afterYouSubmit: {
		"title": "What Happens After You Submit?",
		"steps": [
			"We confirm your submission.",
			"Our team reviews the equipment information and evaluates current market opportunities.",
			"If additional information is needed, we'll contact you directly.",
			"We determine how the equipment may be positioned within our regional buyer network.",
			"We'll discuss the recommended next steps and answer any questions before moving forward."
		],
		"outro": "Every submission receives an individual review based on equipment type, condition, market demand, and regional buyer interest."
	},
	form: {
		"title": "Equipment Submission Form",
		"subtitle": "Tell Us About Your Equipment",
		"intro": "Provide the information you currently have available. You don't need every specification to get started. Our brokerage team will review your submission and contact you if additional details are needed.",
		"requiredNote": "Fields marked with * are required.",
		"sections": {
			"contact": "Contact Information",
			"equipment": "Equipment Information",
			"selling": "Selling Information",
			"photos": "Upload Photos",
			"documents": "Upload Documents",
			"additional": "Additional Information",
			"confirmation": "Confirmation"
		},
		"labels": {
			"fullName": "Full Name",
			"company": "Company Name",
			"email": "Email Address",
			"phone": "Phone Number",
			"category": "Equipment Category",
			"description": "Equipment Description",
			"quantity": "Quantity",
			"location": "Equipment Location",
			"condition": "General Condition",
			"isOwner": "Are You the Equipment Owner?",
			"intent": "What Are You Looking to Do?",
			"availability": "Is the Equipment Currently Available?",
			"estimatedValue": "Estimated Equipment Value",
			"additionalInfo": "Tell Us Anything Else About Your Equipment"
		},
		"hints": {
			"description": "Tell us what you're selling.",
			"descriptionPlaceholder": "CAT 3512 Generator, Horizontal Separator, Pump Package, 500 BBL Tank",
			"estimatedValue": "Optional",
			"intent": "Select all that apply.",
			"photos": "Upload photos of the equipment if available.",
			"photosHelpful": "Helpful photos include:",
			"photoItems": [
				"Overall equipment",
				"Multiple angles",
				"Equipment nameplate",
				"Control panels",
				"Interior components",
				"Visible wear or damage"
			],
			"photoGuidePrompt": "Need help deciding what to include?",
			"documents": "Upload any available documentation.",
			"documentsHelpful": "Helpful documents may include:",
			"documentItems": [
				"Maintenance records",
				"Inspection reports",
				"Specification sheets",
				"Equipment manuals",
				"Service history"
			],
			"documentGuidePrompt": "Not sure which documents are helpful?",
			"additionalInfoExamples": [
				"Known issues",
				"Package details",
				"Project information",
				"Desired selling timeline",
				"Questions for our team"
			]
		},
		"guideLinks": {
			"photos": {
				"label": "View Equipment Photo Guide",
				"href": "/sell-equipment/upload-photos"
			},
			"documents": {
				"label": "View Equipment Documentation Guide",
				"href": "/sell-equipment/upload-documents"
			}
		},
		"consent": {
			"accuracy": "I confirm that the information provided is accurate to the best of my knowledge.",
			"contact": "I authorize Petra to contact me regarding this equipment submission."
		},
		"submitLabel": "Submit Equipment for Review",
		"supportingText": "Our brokerage team will review your submission and determine whether your equipment is a good fit for our buyer network. If we need additional information, we'll contact you directly."
	},
	faqSection: { "title": "Frequently Asked Questions" },
	faqs: [
		{
			"question": "Is there a cost to submit equipment?",
			"answer": "No. Submitting equipment for review is free."
		},
		{
			"question": "Do I need complete information before submitting?",
			"answer": "No. Submit the information you currently have. Petra will work with you if additional details are needed."
		},
		{
			"question": "What if I don't have photos?",
			"answer": "Photos are helpful but not required to begin the review process."
		},
		{
			"question": "Can I submit more than one piece of equipment?",
			"answer": "Yes. We work with individual assets, complete equipment packages, and surplus equipment inventories."
		},
		{
			"question": "How soon will Petra contact me?",
			"answer": "After reviewing your submission, we'll reach out if additional information is needed or to discuss potential next steps."
		},
		{
			"question": "Am I obligated to sell after submitting?",
			"answer": "No. Submitting your equipment simply begins the review process. You'll have the opportunity to discuss options before making any decisions."
		}
	],
	needAssistance: {
		"title": "Need Assistance Before Submitting?",
		"body": ["If you're unsure whether your equipment is a good fit or have questions about the submission process, we're happy to help.", "Talk with a Petra broker before completing your submission."],
		"cta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	finalCta: {
		"title": "Ready to Submit Your Equipment?",
		"body": ["Whether you're selling a single asset or liquidating surplus equipment, Petra is ready to review your submission and discuss the opportunities available through our regional brokerage network.", "We'll provide straightforward guidance, honest communication, and a professional brokerage process from the very beginning."],
		"valuationPrompt": {
			"before": "Not sure if now is the right time to sell? Start with a ",
			"link": {
				"label": "Request a Market-Based Valuation",
				"href": "/sell-equipment/request-valuation"
			},
			"after": " to better understand your equipment's market potential."
		},
		"questionsPrompt": {
			"before": "Still have questions before submitting? Visit our ",
			"link": {
				"label": "Sell Equipment FAQs",
				"href": "/sell-equipment/faqs"
			},
			"middle": " or ",
			"secondLink": {
				"label": "Talk to a Broker",
				"href": "/sell-equipment/contact-broker"
			},
			"after": " for straightforward guidance before getting started."
		},
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "#equipment-submission-form"
		}
	},
	confirmationPage: {
		"meta": {
			"title": "Thank You | Equipment Submission | Petra Equipment Brokerage",
			"description": "Your equipment submission has been received. Petra's brokerage team will review the details and follow up with next steps."
		},
		"title": "Thank You!",
		"body": ["Your equipment submission has been received.", "Our team will review the information you've provided and contact you if additional details are needed or if we'd like to discuss the opportunity further."],
		"primaryCta": {
			"label": "Return to Sell Equipment",
			"href": "/sell-equipment"
		},
		"secondaryCta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/EquipmentSubmission.tsx
var EquipmentSubmission_exports = /* @__PURE__ */ __exportAll({ default: () => EquipmentSubmission });
var { meta: meta$14, hero: hero$14, whatToInclude, afterYouSubmit, form, faqSection: faqSection$10, faqs: faqs$12, needAssistance, finalCta: finalCta$14 } = equipment_submission_default;
function EquipmentSubmission({ canonicalUrl, ogImageUrl, categoryOptions, locationOptions, conditionOptions, ownershipOptions, intentOptions, availabilityOptions, valueRangeOptions }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$14.description),
			breadcrumbNode(canonicalUrl, {
				name: "Equipment Submission",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$12)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$14.title,
		description: meta$14.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$14 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Before You Start",
						title: whatToInclude.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whatToInclude.body,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 grid grid-cols-1 gap-px bg-[#dad5cb] md:grid-cols-2 lg:grid-cols-3",
						children: whatToInclude.groups.map((group) => /* @__PURE__ */ jsxs("article", {
							className: "bg-white p-7",
							children: [
								/* @__PURE__ */ jsx("h3", {
									className: "font-heading text-xl font-semibold uppercase tracking-[0.08em] text-neutral-950",
									children: group.title
								}),
								/* @__PURE__ */ jsx("div", {
									className: "mt-4 space-y-3",
									children: /* @__PURE__ */ jsx(RichTextList, {
										items: group.intro,
										className: "text-base leading-7 text-neutral-600"
									})
								}),
								/* @__PURE__ */ jsx("ul", {
									className: "mt-4 space-y-2",
									children: group.items.map((item) => /* @__PURE__ */ jsxs("li", {
										className: "flex items-start gap-3 text-base leading-7 text-neutral-700",
										children: [/* @__PURE__ */ jsx("span", {
											"aria-hidden": "true",
											className: "mt-3 h-1 w-1 shrink-0 bg-[#a56437]"
										}), item]
									}, item))
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-base leading-7 text-neutral-600",
									children: group.outro
								}),
								"guideLink" in group && group.guideLink ? /* @__PURE__ */ jsx("a", {
									href: group.guideLink.href,
									className: "mt-4 inline-block font-semibold text-[#a56437] underline underline-offset-4 transition-colors hover:text-neutral-950",
									children: group.guideLink.label
								}) : null
							]
						}, group.title))
					})
				]
			}),
			/* @__PURE__ */ jsx(PublicSubmissionForm, {
				categoryOptions,
				locationOptions,
				conditionOptions,
				ownershipOptions,
				intentOptions,
				availabilityOptions,
				valueRangeOptions,
				copy: form
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "After Submitting",
						title: afterYouSubmit.title
					}),
					/* @__PURE__ */ jsx(NumberedSteps, { steps: afterYouSubmit.steps.map((step) => ({ text: step })) }),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: afterYouSubmit.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection$10.title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-10 max-w-4xl",
					children: /* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$12 })
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Talk First",
						title: needAssistance.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: needAssistance.body,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8",
						children: /* @__PURE__ */ jsx(SecondaryButton, { ...needAssistance.cta })
					})
				]
			}),
			/* @__PURE__ */ jsx(FinalCta, {
				title: finalCta$14.title,
				body: finalCta$14.body,
				primaryCta: finalCta$14.primaryCta,
				children: /* @__PURE__ */ jsxs("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: [/* @__PURE__ */ jsx(RichText, {
						value: finalCta$14.valuationPrompt,
						className: "text-base leading-7 text-white/70"
					}), /* @__PURE__ */ jsx(RichText, {
						value: finalCta$14.questionsPrompt,
						className: "text-base leading-7 text-white/70"
					})]
				})
			})
		]
	})] });
}
var faqs_default = {
	meta: {
		"title": "Sell Equipment FAQs | Oilfield Equipment Brokerage | Petra",
		"description": "Find answers to common questions about selling used oilfield and industrial equipment. Learn about valuations, brokerage, submissions, pricing, and the selling process with Petra."
	},
	hero: {
		"title": "Sell Equipment FAQs",
		"subtitle": "Common Questions About Selling Used Oilfield & Industrial Equipment",
		"body": [
			"Selling equipment is an important business decision, and it's natural to have questions before getting started.",
			"Below are answers to some of the most common questions we receive from equipment owners, operators, and businesses throughout Wyoming, the Rockies, and surrounding producing regions.",
			"If you don't see your question here, our team is always available to help."
		],
		"primaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		},
		"secondaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		}
	},
	groups: [
		{
			"title": "Before You Sell",
			"faqs": [
				{
					"question": "Is now a good time to sell used oilfield equipment?",
					"answer": "Market conditions change throughout the year based on industry activity, buyer demand, and equipment availability. If you're considering selling, understanding your equipment's current market potential is often the best first step."
				},
				{
					"question": "Can I sell equipment that has been sitting unused?",
					"answer": "Yes. Idle equipment often still has value, especially if it has been properly stored or maintained. Even if equipment has been out of service for some time, it may still be attractive to qualified buyers."
				},
				{
					"question": "Does equipment need to be operating before I can sell it?",
					"answer": "Not necessarily. Both operating and non-operating equipment may have market value depending on the equipment type, condition, and buyer demand."
				},
				{
					"question": "Can I sell older equipment?",
					"answer": "Yes. Age is only one factor buyers consider. Equipment condition, maintenance history, specifications, and market demand often play a much larger role."
				}
			],
			"outro": {
				"before": "Not sure whether your equipment is a good fit for today's market? A ",
				"link": {
					"label": "Request a Market-Based Valuation",
					"href": "/sell-equipment/request-valuation"
				},
				"after": " can help you better understand its market potential before making a decision."
			}
		},
		{
			"title": "Preparing Your Equipment",
			"intro": {
				"before": "Preparing your equipment before submission can help buyers better understand its condition. Visit our ",
				"link": {
					"label": "Equipment Photo Guide",
					"href": "/sell-equipment/upload-photos"
				},
				"middle": " and ",
				"secondLink": {
					"label": "Equipment Documentation Guide",
					"href": "/sell-equipment/upload-documents"
				},
				"after": " for practical recommendations."
			},
			"faqs": [
				{
					"question": "Should I clean equipment before taking photos?",
					"answer": "A clean piece of equipment helps buyers better understand its condition, but professional detailing isn't necessary. Removing excessive dirt or debris can improve photo quality and provide a clearer representation of the equipment."
				},
				{
					"question": "What if I don't have maintenance records?",
					"answer": "That's okay. Maintenance records are helpful but not required. Submit the information you have, and Petra will review your equipment based on the available details."
				},
				{
					"question": "Is cosmetic damage a problem?",
					"answer": "Normal wear is expected on used equipment. Being transparent about cosmetic damage helps buyers understand the equipment and often leads to smoother conversations later in the brokerage process."
				},
				{
					"question": "Can I sell equipment that's missing parts?",
					"answer": "In many cases, yes. Some buyers specifically look for equipment to repair, rebuild, or use for parts. Missing components don't automatically eliminate market potential."
				}
			]
		},
		{
			"title": "Equipment Value",
			"faqs": [
				{
					"question": "What factors affect the value of used equipment?",
					"answer": "Several factors influence equipment value, including condition, age, specifications, maintenance history, regional buyer demand, and current market activity."
				},
				{
					"question": "Will repairing equipment increase its value?",
					"answer": "It depends. Some repairs may improve buyer interest, while others may not significantly affect market value. Petra can help you determine whether repairs are likely to provide a worthwhile return."
				},
				{
					"question": "Can I suggest an asking price?",
					"answer": "Yes. Seller expectations are an important part of the conversation. Petra works with sellers to evaluate current market conditions and develop realistic pricing guidance."
				},
				{
					"question": "Why do similar pieces of equipment sell for different prices?",
					"answer": "Even similar equipment can vary in value based on operating condition, maintenance history, configuration, documentation, location, and buyer demand."
				}
			],
			"outro": {
				"before": "Every piece of equipment is different. If you'd like guidance based on your specific equipment, ",
				"link": {
					"label": "Request a Market-Based Valuation",
					"href": "/sell-equipment/request-valuation"
				},
				"after": "."
			}
		},
		{
			"title": "Working With Petra",
			"faqs": [
				{
					"question": "Why should I use an equipment broker instead of selling equipment myself?",
					"answer": "Selling equipment often involves marketing, answering technical questions, negotiating with buyers, and coordinating documentation. Petra helps simplify that process by connecting sellers with qualified buyers while managing communication throughout the transaction."
				},
				{
					"question": "Does Petra purchase equipment directly?",
					"answer": "Petra primarily operates as an equipment brokerage, helping connect buyers and sellers rather than purchasing equipment directly."
				},
				{
					"question": "How does Petra earn its fee?",
					"answer": "Petra's brokerage fees are discussed as part of the selling process, allowing sellers to understand how the brokerage relationship works before moving forward."
				},
				{
					"question": "What happens if my equipment doesn't sell?",
					"answer": "Market conditions vary, and not every asset sells immediately. If equipment remains available, Petra may discuss adjustments to pricing, marketing strategy, or buyer outreach based on current market activity."
				}
			],
			"outro": {
				"before": "Learn more about ",
				"link": {
					"label": "Why Sell With Petra",
					"href": "/sell-equipment/why-sell-with-petra"
				},
				"after": " and how our brokerage approach helps equipment owners make informed selling decisions."
			}
		},
		{
			"title": "Buyers & Transactions",
			"faqs": [
				{
					"question": "Who typically buys equipment through Petra?",
					"answer": "Buyers may include oil and gas operators, production companies, industrial businesses, contractors, equipment dealers, and other organizations looking for quality used equipment."
				},
				{
					"question": "Can buyers request additional information?",
					"answer": "Yes. Buyers may request additional photos, documentation, or clarification before making purchasing decisions."
				},
				{
					"question": "Can I decline an offer?",
					"answer": "Absolutely. You remain in control throughout the brokerage process and decide whether to accept, reject, or negotiate any offer."
				},
				{
					"question": "What happens after I accept an offer?",
					"answer": "Petra continues supporting the transaction by helping coordinate communication, documentation, and the next steps toward completing the sale."
				}
			],
			"outro": {
				"before": "Curious about what happens after you decide to sell? Explore the ",
				"link": {
					"label": "Seller Process",
					"href": "/sell-equipment/seller-process"
				},
				"after": " for a step-by-step overview."
			}
		},
		{
			"title": "Wyoming & Regional Service",
			"faqs": [
				{
					"question": "Does Petra only work in Wyoming?",
					"answer": "No. While Petra focuses on Wyoming and the surrounding Rockies, we work with buyers and sellers across other producing and industrial regions when opportunities align."
				},
				{
					"question": "Can Petra help sell equipment located outside Wyoming?",
					"answer": "Yes. Equipment located outside Wyoming may still be eligible for brokerage depending on its location, market demand, and buyer interest."
				},
				{
					"question": "Does equipment location affect market value?",
					"answer": "Yes. Transportation costs, regional demand, and local market conditions can all influence buyer interest and overall market value."
				}
			]
		}
	],
	finalCta: {
		"title": "Ready to Take the Next Step?",
		"body": [
			"Every equipment sale is different, and every seller's situation is unique.",
			"Whether you're ready to submit equipment, would like to better understand its market potential, or simply want to discuss your options, Petra is here to help.",
			"We'll provide honest guidance, practical recommendations, and straightforward answers based on your equipment and today's market."
		],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		},
		"smallLink": {
			"label": "Request a Market-Based Valuation",
			"href": "/sell-equipment/request-valuation"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/Faqs.tsx
var Faqs_exports = /* @__PURE__ */ __exportAll({ default: () => SellEquipmentFaqs });
var { meta: meta$12, hero: hero$12, groups, finalCta: finalCta$12 } = faqs_default;
/** Every group's questions, flattened — the FAQPage node describes the whole page. */
var allFaqs = groups.flatMap((group) => group.faqs);
function SellEquipmentFaqs({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$12.description),
			breadcrumbNode(canonicalUrl, {
				name: "Sell Equipment FAQs",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, allFaqs)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$12.title,
		description: meta$12.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$12 }),
			groups.map((group, index) => /* @__PURE__ */ jsxs(Section, {
				background: index % 2 === 0 ? "cream" : "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, { title: group.title }),
					"intro" in group && group.intro ? /* @__PURE__ */ jsx(RichText, {
						value: group.intro,
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600"
					}) : null,
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 max-w-4xl",
						children: [/* @__PURE__ */ jsx(FaqAccordion, { faqs: group.faqs }), "outro" in group && group.outro ? /* @__PURE__ */ jsx(RichText, {
							value: group.outro,
							className: "mt-8 text-base leading-7 text-neutral-600"
						}) : null]
					})
				]
			}, group.title)),
			/* @__PURE__ */ jsx(FinalCta, {
				title: finalCta$12.title,
				body: finalCta$12.body,
				primaryCta: finalCta$12.primaryCta,
				secondaryCta: finalCta$12.secondaryCta,
				children: /* @__PURE__ */ jsx("p", {
					className: "mt-6 text-base leading-7 text-white/70",
					children: /* @__PURE__ */ jsx("a", {
						href: finalCta$12.smallLink.href,
						className: "font-semibold text-[#d69a6c] underline underline-offset-4 transition-colors hover:text-white",
						children: finalCta$12.smallLink.label
					})
				})
			})
		]
	})] });
}
var sell_equipment_default = {
	meta: {
		"title": "Sell Used Oilfield Equipment | Petra Equipment Brokerage",
		"description": "Sell used oilfield and industrial equipment with Petra. We connect qualified buyers with compressors, separators, tanks, generators, and surplus equipment."
	},
	hero: {
		"title": "Sell Used Oilfield & Industrial Equipment",
		"body": ["Got equipment sitting idle in a yard or out in the field?", "Petra helps companies turn unused oilfield and industrial equipment into working capital by connecting sellers with qualified buyers across Wyoming, the Rockies, and surrounding producing regions."],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	workingCapital: {
		"title": "Turn Idle Equipment Into Working Capital",
		"body": ["Unused equipment does not have to sit and lose value.", "Whether you are clearing surplus inventory, replacing production equipment, or liquidating idle assets, Petra helps move equipment through a regional brokerage network built around real buyers and real market demand."],
		"cta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		}
	},
	whyEquipmentDoesNotSell: {
		"title": "Why Equipment Does Not Sell",
		"intro": ["Most equipment does not fail to sell because it is bad.", "It usually sits because:"],
		"reasons": [
			"It is not reaching the right buyers",
			"Pricing is not aligned with the market",
			"It is only shown to a small local network",
			"Internal teams do not have time to manage calls, questions, and negotiation"
		],
		"outro": "Petra helps sellers avoid the runaround by handling the brokerage process from positioning your equipment through buyer communication and negotiations."
	},
	equipmentYouCanSell: {
		"title": "What Equipment Can You Sell?",
		"intro": "Petra brokers a wide range of used oilfield and industrial equipment, including:",
		"items": [
			"Compressors",
			"Separators",
			"Production equipment packages",
			"Heater treaters",
			"Pump packages",
			"Storage tanks and tank batteries",
			"Generators and power units",
			"Flowback equipment",
			"Pipe and tubular",
			"Valves and control systems",
			"Surplus yard inventory",
			"Single assets or full packages"
		],
		"outro": {
			"before": "Not sure whether your equipment has value in today's market? ",
			"link": {
				"label": "Request a market-based valuation",
				"href": "/sell-equipment/request-valuation"
			},
			"after": " and we'll review your equipment before you decide to sell."
		}
	},
	whatWeNeed: {
		"title": "What We Need From You",
		"intro": "To review your equipment, Petra typically needs:",
		"items": [
			"Equipment description",
			"Current location",
			"General condition",
			"Photos, if available",
			"Documents or maintenance records, if available"
		],
		"outro": {
			"before": "If you're ready, you can ",
			"link": {
				"label": "submit your equipment",
				"href": "/sell-equipment/equipment-submission"
			},
			"after": " with whatever information you have today. Additional photos or documentation can always be added later."
		}
	},
	process: {
		"title": "How Our Equipment Brokerage Process Works",
		"steps": [
			{
				"title": "Submit Your Equipment",
				"body": "Send the basic details, location, condition, and available photos."
			},
			{
				"title": "We Review the Equipment",
				"body": "Petra evaluates market fit, demand, condition, and buyer potential."
			},
			{
				"title": "We Connect With Qualified Buyers",
				"body": "We present the equipment to buyers who are actually looking for assets like yours."
			},
			{
				"title": "We Manage the Back-and-Forth",
				"body": "Petra handles questions, buyer communication, negotiation, and coordination."
			},
			{
				"title": "The Deal Moves Forward",
				"body": "Once terms are agreed on, we help move the transaction toward completion."
			}
		],
		"cta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	valuation: {
		"title": "Equipment Valuation",
		"body": ["Not sure what your equipment is worth?", "Petra helps position equipment based on current market conditions, demand, condition, location, and comparable sales — not guesswork."],
		"outro": {
			"before": "Learn more about our ",
			"link": {
				"label": "Equipment Valuation",
				"href": "/sell-equipment/request-valuation"
			},
			"after": " process."
		}
	},
	faqSection: {
		"title": "Frequently Asked Questions",
		"outro": {
			"before": "Looking for more answers? Visit our ",
			"link": {
				"label": "Sell Equipment FAQs",
				"href": "/sell-equipment/faqs"
			},
			"after": "."
		}
	},
	faqs: [
		{
			"question": "What types of equipment can I sell?",
			"answer": "Petra brokers used oilfield and industrial equipment, including compressors, separators, tanks, generators, pump packages, production equipment, and surplus inventory."
		},
		{
			"question": "Do you purchase equipment directly?",
			"answer": "Petra primarily operates as a brokerage, connecting sellers with qualified buyers through our regional network."
		},
		{
			"question": "How is my equipment valued?",
			"answer": "Valuation is based on market demand, equipment type, condition, location, documentation, and comparable sales."
		},
		{
			"question": "Can I submit equipment outside Wyoming?",
			"answer": "Yes. Petra focuses on Wyoming and surrounding producing regions, but also works across the Rockies and other energy-producing markets."
		},
		{
			"question": "Do I need inspection reports or maintenance records?",
			"answer": "No. They are helpful, but not required to begin the review process."
		},
		{
			"question": "Can I speak with a broker before submitting?",
			"answer": "Yes. You can contact a broker before submitting equipment if you have questions about value, fit, or the selling process."
		}
	],
	finalCta: {
		"title": "Ready to Sell Your Equipment?",
		"body": ["If your equipment is sitting idle, Petra can help determine whether there is a real market for it.", "We will tell you straight whether we can help."],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/Index.tsx
var Index_exports = /* @__PURE__ */ __exportAll({ default: () => SellEquipmentIndex });
var { meta: meta$10, hero: hero$10, workingCapital, whyEquipmentDoesNotSell, equipmentYouCanSell, whatWeNeed, process: process$2, valuation, faqSection: faqSection$8, faqs: faqs$10, finalCta: finalCta$10 } = sell_equipment_default;
function SellEquipmentIndex({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$10.description),
			breadcrumbNode(canonicalUrl),
			faqPageNode(canonicalUrl, faqs$10)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$10.title,
		description: meta$10.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$10 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Working Capital",
						title: workingCapital.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: workingCapital.body,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-8",
						children: /* @__PURE__ */ jsx(PrimaryButton, { ...workingCapital.cta })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Reality Check",
						title: whyEquipmentDoesNotSell.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whyEquipmentDoesNotSell.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whyEquipmentDoesNotSell.reasons,
						columns: 2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl font-heading text-xl font-semibold uppercase tracking-[0.06em] text-neutral-950",
						children: whyEquipmentDoesNotSell.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "dark",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "What You Can Sell",
						title: equipmentYouCanSell.title,
						tone: "dark"
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-white/70 sm:text-lg",
						children: equipmentYouCanSell.intro
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10 grid grid-cols-2 gap-px bg-white/15 md:grid-cols-3 lg:grid-cols-4",
						children: equipmentYouCanSell.items.map((item) => /* @__PURE__ */ jsxs("div", {
							className: "bg-[#1c1a16] p-5 transition-colors hover:bg-[#24211c]",
							children: [/* @__PURE__ */ jsx("div", { className: "mb-4 h-1.5 w-1.5 bg-[#a56437]" }), /* @__PURE__ */ jsx("h3", {
								className: "font-heading text-base font-semibold uppercase tracking-[0.06em] text-white",
								children: item
							})]
						}, item))
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: equipmentYouCanSell.outro,
						className: "mt-10 max-w-3xl text-base leading-7 text-white/70"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Submit Equipment",
						title: whatWeNeed.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: whatWeNeed.intro
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whatWeNeed.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: whatWeNeed.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Seller Process",
						title: process$2.title
					}),
					/* @__PURE__ */ jsx(NumberedSteps, { steps: process$2.steps.map((step) => ({
						title: step.title,
						text: step.body
					})) }),
					/* @__PURE__ */ jsx("div", {
						className: "mt-10",
						children: /* @__PURE__ */ jsx(PrimaryButton, { ...process$2.cta })
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Valuation",
						title: valuation.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: valuation.body,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: valuation.outro,
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection$8.title
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10 max-w-4xl",
					children: [/* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$10 }), /* @__PURE__ */ jsx(RichText, {
						value: faqSection$8.outro,
						className: "mt-8 text-base leading-7 text-neutral-600"
					})]
				})]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta$10 })
		]
	})] });
}
var request_valuation_default = {
	meta: {
		"title": "Oilfield Equipment Valuation | Petra Equipment Brokerage",
		"description": "Request a market-based valuation for your used oilfield and industrial equipment. Petra reviews buyer demand, equipment condition, and regional market activity."
	},
	hero: {
		"title": "Request Equipment Valuation",
		"subtitle": "Understand What Your Equipment May Be Worth",
		"body": [
			"Before deciding to sell, it's helpful to understand how your equipment fits within today's market.",
			"Petra provides market-based equipment valuations using regional market knowledge, current buyer demand, equipment condition, and brokerage experience across Wyoming, the Rockies, and surrounding producing regions.",
			"Whether you're selling a single asset or evaluating surplus equipment, we'll provide straightforward guidance to help you make informed decisions."
		],
		"primaryCta": {
			"label": "Request a Market-Based Valuation",
			"href": "/sell-equipment/equipment-submission"
		}
	},
	whyRequest: {
		"title": "Why Request a Market-Based Valuation?",
		"intro": ["Knowing your equipment's potential market value helps you make better decisions before selling.", "A valuation can help you:"],
		"items": [
			"Understand current market demand",
			"Set realistic pricing expectations",
			"Evaluate whether now is the right time to sell",
			"Identify factors that may influence buyer interest",
			"Prepare your equipment for the brokerage process"
		],
		"outro": {
			"before": "If you're still deciding whether Petra is the right brokerage partner, learn ",
			"link": {
				"label": "Why Sell With Petra",
				"href": "/sell-equipment/why-sell-with-petra"
			},
			"after": " and see how we help equipment owners make informed selling decisions."
		}
	},
	whatWeConsider: {
		"title": "What We Consider During Our Review",
		"items": [
			{
				"title": "Current Market Demand",
				"body": ["Equipment values change based on buyer demand and market activity.", "We consider what buyers are actively looking for across Wyoming, the Rockies, and surrounding producing regions."]
			},
			{
				"title": "Equipment Condition",
				"body": ["Condition plays an important role in valuation.", "We'll review information such as:"],
				"items": [
					"Operating condition",
					"Visible wear",
					"Maintenance history",
					"Overall equipment readiness"
				]
			},
			{
				"title": "Equipment Type & Specifications",
				"body": ["The type of equipment you're selling helps determine market interest.", "Information such as manufacturer, model, age, capacity, and specifications provides valuable context during our review."]
			},
			{
				"title": "Regional Market Activity",
				"body": ["Equipment demand varies by region.", "Petra focuses on Wyoming and the surrounding energy-producing markets, allowing us to consider regional buyer activity when reviewing your equipment."]
			},
			{
				"title": "Supporting Information",
				"body": ["Photos, maintenance records, inspection reports, and other supporting documents help us better understand your equipment and provide more informed guidance.", "Don't worry if you don't have everything—submit what you have."]
			},
			{
				"title": "Comparable Market Opportunities",
				"body": ["We also consider current brokerage activity and comparable equipment opportunities to better understand how your equipment may fit within today's market."]
			}
		],
		"outro": {
			"before": "Once you're ready, you can ",
			"link": {
				"label": "submit your equipment",
				"href": "/sell-equipment/equipment-submission"
			},
			"after": " for a full review by our brokerage team."
		}
	},
	whatYoullNeed: {
		"title": "What You'll Need",
		"intro": "To request a valuation, it's helpful to provide:",
		"items": [
			"Equipment type",
			"Manufacturer and model",
			"Equipment location",
			"General condition",
			"Photos (if available)",
			"Supporting documents (if available)"
		],
		"outro": "The more information you provide, the more accurately we can review your equipment."
	},
	afterYouRequest: {
		"title": "What Happens After You Request a Valuation?",
		"steps": [
			"Submit your equipment information.",
			"Petra reviews the available details and supporting information.",
			"We evaluate current market conditions, regional demand, and comparable opportunities.",
			"If additional information is needed, we'll contact you directly.",
			"We'll discuss our observations, answer your questions, and explain the recommended next steps."
		],
		"outro": "There is no obligation to move forward with the brokerage process after receiving a valuation.",
		"processLink": {
			"before": "After reviewing your equipment, we'll discuss our recommendations and, if appropriate, guide you through the ",
			"link": {
				"label": "Seller Process",
				"href": "/sell-equipment/seller-process"
			},
			"after": "."
		}
	},
	whyDifferent: {
		"title": "Why Petra's Approach Is Different",
		"body": [
			"Petra doesn't rely on automated pricing tools or generic estimates.",
			"Every valuation is reviewed using current market activity, regional buyer demand, equipment condition, and brokerage experience.",
			"Our goal is to provide practical guidance—not unrealistic expectations.",
			"If we believe your equipment has strong market potential, we'll explain why.",
			"If market conditions are challenging, we'll tell you that, too.",
			"Honest communication is part of our brokerage process."
		]
	},
	faqSection: {
		"title": "Frequently Asked Questions",
		"outro": {
			"before": "Have questions about valuations, pricing, or the brokerage process? Visit our ",
			"link": {
				"label": "Sell Equipment FAQs",
				"href": "/sell-equipment/faqs"
			},
			"after": " for additional answers."
		}
	},
	faqs: [
		{
			"question": "Is requesting a valuation free?",
			"answer": "Yes. Petra provides an initial market-based valuation review at no cost."
		},
		{
			"question": "Is this a certified equipment appraisal?",
			"answer": "No. Our valuation is a brokerage opinion based on market conditions, buyer demand, equipment information, and regional industry experience. It is not a certified appraisal."
		},
		{
			"question": "Am I required to sell after receiving a valuation?",
			"answer": "No. Requesting a valuation does not obligate you to sell your equipment."
		},
		{
			"question": "How long does the review take?",
			"answer": "Review times vary depending on the equipment and the information provided. If additional details are needed, Petra will contact you directly."
		},
		{
			"question": "Can I request valuations for multiple pieces of equipment?",
			"answer": "Yes. We regularly review individual assets, complete equipment packages, and surplus equipment inventories."
		}
	],
	finalCta: {
		"title": "Ready to Understand Your Equipment's Market Potential?",
		"body": [
			"If you're considering selling used oilfield or industrial equipment, understanding its market potential is the best place to start.",
			"Petra provides straightforward, market-based guidance using the information you provide, regional market activity, buyer demand, and brokerage experience—helping you make informed decisions before moving forward.",
			"Every piece of equipment is different. Some assets may be a strong fit for our buyer network, while others may require a different sales strategy. A market-based valuation helps you better understand your equipment's potential and the options available before deciding to sell."
		],
		"primaryCta": {
			"label": "Request a Market-Based Valuation",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	valuationNotice: {
		"title": "Brokerage Valuation Notice",
		"body": "Petra provides market-based brokerage valuations to help equipment owners understand potential market opportunities. These valuations are intended for brokerage guidance only and should not be considered certified equipment appraisals."
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/RequestValuation.tsx
var RequestValuation_exports = /* @__PURE__ */ __exportAll({ default: () => RequestValuation });
var { meta: meta$8, hero: hero$8, whyRequest, whatWeConsider, whatYoullNeed, afterYouRequest, whyDifferent, faqSection: faqSection$6, faqs: faqs$8, finalCta: finalCta$8, valuationNotice } = request_valuation_default;
function RequestValuation({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$8.description),
			breadcrumbNode(canonicalUrl, {
				name: "Request Equipment Valuation",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$8)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$8.title,
		description: meta$8.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$8 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Why Ask",
						title: whyRequest.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whyRequest.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whyRequest.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: whyRequest.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Our Review",
						title: whatWeConsider.title
					}),
					/* @__PURE__ */ jsx(CardGrid, {
						items: whatWeConsider.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: whatWeConsider.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Preparation",
						title: whatYoullNeed.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: whatYoullNeed.intro
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whatYoullNeed.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: whatYoullNeed.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "What Happens Next",
						title: afterYouRequest.title
					}),
					/* @__PURE__ */ jsx(NumberedSteps, { steps: afterYouRequest.steps.map((step) => ({ text: step })) }),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: afterYouRequest.outro
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: afterYouRequest.processLink,
						className: "mt-4 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "dark",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Our Approach",
					title: whyDifferent.title,
					tone: "dark"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: whyDifferent.body,
						className: "text-base leading-7 text-white/70 sm:text-lg"
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection$6.title
				}), /* @__PURE__ */ jsxs("div", {
					className: "mt-10 max-w-4xl",
					children: [/* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$8 }), /* @__PURE__ */ jsx(RichText, {
						value: faqSection$6.outro,
						className: "mt-8 text-base leading-7 text-neutral-600"
					})]
				})]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta$8 }),
			/* @__PURE__ */ jsx("aside", {
				className: "border-t border-[#dad5cb] bg-[#f3f1ec]",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-10 sm:px-10",
					children: [/* @__PURE__ */ jsx("h2", {
						className: "font-heading text-sm font-semibold uppercase tracking-[0.16em] text-neutral-500",
						children: valuationNotice.title
					}), /* @__PURE__ */ jsx("p", {
						className: "mt-3 max-w-4xl text-sm leading-6 text-neutral-500",
						children: valuationNotice.body
					})]
				})
			})
		]
	})] });
}
var seller_process_default = {
	meta: {
		"title": "Seller Process | Oilfield Equipment Brokerage | Petra",
		"description": "Learn how Petra's equipment brokerage process helps companies sell used oilfield and industrial equipment through qualified buyers, market guidance, and transaction support."
	},
	hero: {
		"title": "Seller Process",
		"subtitle": "A Straightforward Process for Selling Used Oilfield & Industrial Equipment",
		"body": [
			"Selling equipment shouldn't be complicated.",
			"Petra guides you through each stage of the brokerage process—from your initial submission to connecting with qualified buyers and supporting the transaction through completion. Our goal is to make selling equipment as clear, efficient, and professional as possible.",
			"Whether you're selling a single asset or liquidating surplus equipment, you'll always know what comes next."
		],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	process: {
		"title": "How the Seller Process Works",
		"intro": "Our brokerage process is designed to help sellers reach qualified buyers while reducing the time and effort required to manage the sale.",
		"introLink": {
			"before": "Not sure whether you're ready to begin? A ",
			"link": {
				"label": "market-based valuation",
				"href": "/sell-equipment/request-valuation"
			},
			"after": " can help you understand your equipment's potential before entering the brokerage process."
		},
		"steps": [
			{
				"title": "Submit Your Equipment",
				"body": ["Everything starts with the basics.", "Provide the available information about your equipment, including:"],
				"items": [
					"Equipment type",
					"Location",
					"General condition",
					"Photos (if available)",
					"Documentation (if available)"
				],
				"outro": {
					"before": "Complete your ",
					"link": {
						"label": "Equipment Submission",
						"href": "/sell-equipment/equipment-submission"
					},
					"after": " with the information you have available. Additional details can be provided later if needed."
				}
			},
			{
				"title": "Equipment Review & Market Assessment",
				"body": ["Once we receive your submission, our team reviews the equipment to understand its market potential.", "We consider factors such as:"],
				"items": [
					"Equipment type",
					"Current condition",
					"Regional demand",
					"Market activity",
					"Available documentation"
				],
				"outro": "This review helps us determine how the equipment should be positioned within the market."
			},
			{
				"title": "Market Positioning",
				"body": [
					"Selling equipment isn't just about listing it.",
					"Proper positioning helps attract the right buyers.",
					"Petra evaluates current market conditions and presents your equipment with accurate descriptions, supporting information, and practical pricing guidance to improve visibility among qualified buyers."
				]
			},
			{
				"title": "Buyer Outreach",
				"body": ["Once your equipment is ready for market, we begin connecting with buyers through our regional brokerage network.", "Rather than relying solely on public listings, Petra works to present equipment to buyers actively searching for assets that match your equipment's specifications and condition."]
			},
			{
				"title": "Buyer Communication & Negotiation",
				"body": ["As buyer interest develops, Petra manages the communication process on your behalf.", "We help coordinate:"],
				"items": [
					"Buyer inquiries",
					"Equipment questions",
					"Pricing discussions",
					"Negotiations",
					"Inspection requests",
					"Documentation requests"
				],
				"outro": "Our goal is to keep the process organized while allowing your team to stay focused on day-to-day operations."
			},
			{
				"title": "Offer Review",
				"body": ["When offers are received, Petra works with you to review the details.", "We help explain:"],
				"items": [
					"Offer terms",
					"Market considerations",
					"Buyer expectations",
					"Next steps"
				],
				"outro": "Every decision remains yours. Petra provides guidance so you can make informed decisions with confidence."
			},
			{
				"title": "Transaction Support",
				"body": [
					"Once an agreement is reached, Petra continues supporting the transaction through completion.",
					"Depending on the equipment and buyer requirements, Petra may help coordinate equipment inspections, documentation, and communication between all parties to keep the transaction moving efficiently.",
					"Our involvement doesn't end when a buyer is found—we continue working to help move the process toward a successful conclusion."
				]
			}
		]
	},
	whyStructured: {
		"title": "Why a Structured Brokerage Process Matters",
		"intro": ["Many equipment sales slow down because communication becomes inconsistent, pricing isn't aligned with the market, or qualified buyers never see the opportunity.", "Petra's structured brokerage process helps reduce these challenges by providing:"],
		"items": [
			"Clear communication",
			"Market-based guidance",
			"Regional buyer connections",
			"Professional transaction coordination",
			"A straightforward process from beginning to end"
		],
		"outro": "Our objective is simple: help qualified buyers and sellers connect through a professional brokerage experience built on trust and industry knowledge."
	},
	faqSection: {
		"title": "Frequently Asked Questions",
		"intro": "Every equipment sale is different, and questions often come up along the way.",
		"outro": {
			"before": "Visit our ",
			"link": {
				"label": "Sell Equipment FAQs",
				"href": "/sell-equipment/faqs"
			},
			"after": " for additional information about valuations, documentation, equipment preparation, and the brokerage process."
		}
	},
	faqs: [
		{
			"question": "How long does the selling process take?",
			"answer": "Every transaction is different. Timing depends on equipment type, market demand, condition, pricing, and buyer activity."
		},
		{
			"question": "Do I need photos before submitting my equipment?",
			"answer": "Photos are helpful, but they aren't required. The more information you can provide, the better we can evaluate your equipment."
		},
		{
			"question": "Will Petra inspect my equipment?",
			"answer": "Some transactions may require additional information or inspections. If needed, we'll discuss those requirements during the brokerage process."
		},
		{
			"question": "Who communicates with potential buyers?",
			"answer": "Petra manages buyer communication throughout the brokerage process, including inquiries, negotiations, and coordination."
		},
		{
			"question": "Can I sell more than one piece of equipment?",
			"answer": "Yes. Petra works with individual assets, complete equipment packages, and surplus equipment inventories."
		}
	],
	finalCta: {
		"title": "Ready to Get Started?",
		"body": ["If you're ready to sell used oilfield or industrial equipment, Petra is ready to help.", "We'll review your equipment, explain the next steps, and tell you honestly whether we believe there's a market for your asset."],
		"primaryCta": {
			"label": "Submit Equipment",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/SellerProcess.tsx
var SellerProcess_exports = /* @__PURE__ */ __exportAll({ default: () => SellerProcess });
var { meta: meta$6, hero: hero$6, process, whyStructured, faqSection: faqSection$4, faqs: faqs$6, finalCta: finalCta$6 } = seller_process_default;
function SellerProcess({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$6.description),
			breadcrumbNode(canonicalUrl, {
				name: "Seller Process",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$6)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$6.title,
		description: meta$6.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$6 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Step by Step",
						title: process.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: process.intro
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: process.introLink,
						className: "mt-4 max-w-3xl text-base leading-7 text-neutral-600"
					}),
					/* @__PURE__ */ jsx(NumberedSteps, { steps: process.steps })
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Why It Matters",
						title: whyStructured.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: whyStructured.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whyStructured.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: whyStructured.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Questions",
						title: faqSection$4.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: faqSection$4.intro
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "mt-10 max-w-4xl",
						children: [/* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$6 }), /* @__PURE__ */ jsx(RichText, {
							value: faqSection$4.outro,
							className: "mt-8 text-base leading-7 text-neutral-600"
						})]
					})
				]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta$6 })
		]
	})] });
}
//#endregion
//#region resources/js/Pages/SellEquipment/SubmissionThanks.tsx
var SubmissionThanks_exports = /* @__PURE__ */ __exportAll({ default: () => SubmissionThanks });
var { confirmationPage } = equipment_submission_default;
/**
* Post-submission confirmation. Noindexed: it is a step in a flow, not a landing page, and
* it would otherwise compete with the submission page in search results.
*/
function SubmissionThanks({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [breadcrumbNode(canonicalUrl, {
			name: "Thank You",
			url: canonicalUrl
		})]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: confirmationPage.meta.title,
		description: confirmationPage.meta.description,
		canonicalUrl,
		ogImageUrl,
		noindex: true,
		structuredData
	}), /* @__PURE__ */ jsx("main", {
		className: "w-full bg-[#f3f1ec]",
		children: /* @__PURE__ */ jsx("section", {
			className: "border-b border-[#dad5cb] bg-white",
			children: /* @__PURE__ */ jsx("div", {
				className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-28",
				children: /* @__PURE__ */ jsxs("div", {
					className: "max-w-3xl",
					children: [
						/* @__PURE__ */ jsx("span", {
							className: "mb-6 flex h-14 w-14 items-center justify-center bg-[#a56437] text-white",
							children: /* @__PURE__ */ jsx("svg", {
								width: "28",
								height: "28",
								viewBox: "0 0 24 24",
								fill: "none",
								stroke: "currentColor",
								strokeWidth: "2.5",
								children: /* @__PURE__ */ jsx("path", {
									d: "m5 12.5 4.5 4.5L19 7.5",
									strokeLinecap: "square"
								})
							})
						}),
						/* @__PURE__ */ jsx("h1", {
							className: "font-hero text-[2.4rem] font-bold uppercase leading-[1.04] tracking-[0.08em] text-neutral-950 sm:text-[3.1rem]",
							children: confirmationPage.title
						}),
						/* @__PURE__ */ jsx("div", {
							className: "mt-6 space-y-4",
							children: confirmationPage.body.map((paragraph) => /* @__PURE__ */ jsx("p", {
								className: "text-base font-medium leading-7 text-neutral-600 sm:text-lg",
								children: paragraph
							}, paragraph))
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx(PrimaryButton, { ...confirmationPage.primaryCta }), /* @__PURE__ */ jsx(SecondaryButton, { ...confirmationPage.secondaryCta })]
						})
					]
				})
			})
		})
	})] });
}
var upload_documents_default = {
	meta: {
		"title": "Equipment Documentation Guide | Petra Equipment Brokerage",
		"description": "Upload equipment documents to help Petra review, evaluate, and market your used oilfield and industrial equipment. Maintenance records and manuals are helpful but not required."
	},
	hero: {
		"title": "Upload Equipment Documents",
		"subtitle": "Help Us Better Understand Your Equipment",
		"body": [
			"Supporting documents help Petra evaluate your equipment more accurately, answer buyer questions, and prepare your equipment for the brokerage process.",
			"Don't worry if you don't have every document.",
			"Simply upload what you have, and we'll let you know if anything else would be helpful during the review process."
		],
		"primaryCta": {
			"label": "Continue to Equipment Submission",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	whyDocumentationMatters: {
		"title": "Why Equipment Documentation Matters",
		"intro": "The right documentation helps Petra:",
		"items": [
			"Evaluate equipment more efficiently",
			"Verify specifications and equipment details",
			"Answer buyer questions with greater confidence",
			"Reduce unnecessary follow-up requests",
			"Prepare equipment for qualified buyers"
		],
		"outro": "Documentation helps create a smoother brokerage process for everyone involved."
	},
	recommendedDocuments: {
		"title": "Recommended Documents",
		"items": [
			{
				"title": "Specification Sheets",
				"body": ["Technical specifications help buyers understand exactly what equipment they're reviewing.", "Helpful documents include:"],
				"items": [
					"Manufacturer specifications",
					"Model information",
					"Capacity ratings",
					"Technical data sheets"
				]
			},
			{
				"title": "Maintenance Records",
				"body": ["Maintenance history provides valuable insight into how the equipment has been cared for.", "Examples include:"],
				"items": [
					"Routine maintenance logs",
					"Repair records",
					"Service history",
					"Parts replacement records"
				]
			},
			{
				"title": "Inspection Reports",
				"body": ["Previous inspections can help buyers better understand the equipment's condition.", "If available, upload:"],
				"items": [
					"Equipment inspections",
					"Condition reports",
					"Third-party evaluations",
					"Operational assessments"
				]
			},
			{
				"title": "Equipment Manuals",
				"body": ["Equipment manuals help verify operating information and technical details.", "Examples include:"],
				"items": [
					"Operator manuals",
					"Service manuals",
					"Parts manuals",
					"Technical documentation"
				]
			},
			{
				"title": "Ownership & Asset Information",
				"body": ["Any records that help identify the equipment are useful.", "Examples include:"],
				"items": [
					"Asset identification numbers",
					"Inventory records",
					"Purchase information",
					"Equipment registration",
					"Internal asset tracking documents"
				]
			},
			{
				"title": "Other Supporting Documents",
				"body": [
					"Every piece of equipment is different.",
					"If you have additional documentation that may help buyers better understand your equipment, feel free to include it.",
					"Examples include:"
				],
				"items": [
					"Equipment history",
					"Upgrade records",
					"Installation documentation",
					"Operational notes"
				]
			}
		]
	},
	tips: {
		"title": "Tips Before Uploading Documents",
		"intro": ["A few simple tips can help speed up the review process."],
		"items": [
			"PDF files are preferred.",
			"Ensure documents are clear and readable.",
			"Include the most recent records whenever possible.",
			"Upload only documents related to the equipment being submitted.",
			"Don't worry if you don't have every document."
		],
		"outro": "Helpful documentation is always appreciated, but complete records are not required."
	},
	notEveryDocument: {
		"title": "Don't Have Every Document?",
		"body": [
			"That's completely okay.",
			"Many equipment submissions begin with limited documentation.",
			"Submit what you have today.",
			"If additional information would help during the review process, Petra will contact you directly and explain what's needed."
		]
	},
	faqSection: { "title": "Frequently Asked Questions" },
	faqs: [
		{
			"question": "Are documents required before I submit equipment?",
			"answer": "No. Documentation is helpful but not required to begin the brokerage review process."
		},
		{
			"question": "What documents are most helpful?",
			"answer": "Specification sheets, maintenance records, inspection reports, and equipment manuals generally provide the most value during equipment evaluation."
		},
		{
			"question": "Can I upload documents later?",
			"answer": "Yes. If additional documentation becomes available after your initial submission, it can be provided during the brokerage process."
		},
		{
			"question": "What if I don't have maintenance records?",
			"answer": "That's not a problem. Submit the information you have, and Petra will review your equipment based on the available details."
		},
		{
			"question": "Are scanned copies acceptable?",
			"answer": "Yes. Clear scanned documents or readable digital copies are perfectly acceptable."
		},
		{
			"question": "What file types can I upload?",
			"answer": "PDF files are preferred, but common image formats and standard document files are also acceptable when they're clear and easy to read."
		}
	],
	finalCta: {
		"title": "Ready to Upload Your Documents?",
		"body": ["Supporting documentation helps Petra better understand your equipment, verify important details, and provide qualified buyers with accurate information.", "We'll review everything you submit and let you know if additional documentation would be helpful."],
		"primaryCta": {
			"label": "Continue to Equipment Submission",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/UploadDocuments.tsx
var UploadDocuments_exports = /* @__PURE__ */ __exportAll({ default: () => UploadDocuments });
var { meta: meta$4, hero: hero$4, whyDocumentationMatters, recommendedDocuments, tips: tips$2, notEveryDocument, faqSection: faqSection$2, faqs: faqs$4, finalCta: finalCta$4 } = upload_documents_default;
function UploadDocuments({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$4.description),
			breadcrumbNode(canonicalUrl, {
				name: "Equipment Documentation Guide",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$4)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$4.title,
		description: meta$4.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$4 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Why It Helps",
						title: whyDocumentationMatters.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: whyDocumentationMatters.intro
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whyDocumentationMatters.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: whyDocumentationMatters.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Document Checklist",
					title: recommendedDocuments.title
				}), /* @__PURE__ */ jsx(CardGrid, {
					items: recommendedDocuments.items,
					columns: 3
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "dark",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Practical Tips",
						title: tips$2.title,
						tone: "dark"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: tips$2.intro,
							className: "text-base leading-7 text-white/70 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-10 grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3",
						children: tips$2.items.map((tip) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-4 bg-[#1c1a16] p-5",
							children: [/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#a56437]"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-base leading-7 text-white/80",
								children: tip
							})]
						}, tip))
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-white/70",
						children: tips$2.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "No Pressure",
					title: notEveryDocument.title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: notEveryDocument.body,
						className: "text-base leading-7 text-neutral-600 sm:text-lg"
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection$2.title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-10 max-w-4xl",
					children: /* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$4 })
				})]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta$4 })
		]
	})] });
}
var upload_photos_default = {
	meta: {
		"title": "Equipment Photo Guide | Petra Equipment Brokerage",
		"description": "Upload clear photos of your used oilfield and industrial equipment for brokerage review. Learn which images help Petra evaluate and market your equipment."
	},
	hero: {
		"title": "Upload Equipment Photos",
		"subtitle": "Help Us Represent Your Equipment Accurately",
		"body": [
			"Good photos help us understand your equipment, evaluate its condition, and present it accurately to qualified buyers.",
			"Professional photography isn't required.",
			"Clear photos taken with your phone are usually enough to begin the review process.",
			"If you only have a few photos, submit what you have. Additional images can always be provided later if needed."
		],
		"primaryCta": {
			"label": "Continue to Equipment Submission",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	},
	whyPhotosMatter: {
		"title": "Why Equipment Photos Matter",
		"intro": "Photos allow Petra to:",
		"items": [
			"Faster Equipment Review",
			"Better Buyer Interest",
			"More Accurate Representation",
			"Less Back-and-Forth"
		],
		"outro": "The better we understand your equipment, the better we can represent it."
	},
	recommendedPhotos: {
		"title": "Recommended Equipment Photos",
		"items": [
			{
				"title": "Overall Equipment",
				"body": ["Show the complete piece of equipment.", "Take a photo from far enough away so the entire asset is visible."]
			},
			{
				"title": "Multiple Angles",
				"body": ["Capture the equipment from:"],
				"items": [
					"Front",
					"Rear",
					"Both sides"
				],
				"outro": "This helps buyers understand the overall condition and layout."
			},
			{
				"title": "Equipment Nameplate",
				"body": ["Include a clear photo of the manufacturer plate if available.", "Examples:"],
				"items": [
					"Manufacturer",
					"Model",
					"Serial Number",
					"Capacity"
				],
				"outro": "This information helps verify specifications during the brokerage process."
			},
			{
				"title": "Controls & Operating Components",
				"body": ["Photograph important operating areas such as:"],
				"items": [
					"Control panels",
					"Gauges",
					"Displays",
					"Engines",
					"Pumps",
					"Compressors"
				],
				"outro": "These images help buyers better understand the equipment configuration."
			},
			{
				"title": "Interior Components (If Accessible)",
				"body": ["If safe and practical, include photos of:"],
				"items": [
					"Internal compartments",
					"Mechanical components",
					"Accessible systems"
				],
				"outro": "This provides additional information without requiring an on-site inspection."
			},
			{
				"title": "Current Condition",
				"body": ["Don't worry about hiding wear.", "Photos showing:"],
				"items": [
					"Normal wear",
					"Surface rust",
					"Cosmetic damage",
					"Missing components",
					"Repairs"
				],
				"outro": "help us represent the equipment honestly and reduce surprises later in the process."
			}
		]
	},
	tips: {
		"title": "Tips for Better Equipment Photos",
		"intro": ["Getting useful photos doesn't have to be complicated.", "A few simple tips can make a big difference."],
		"items": [
			"Daylight is best.",
			"Keep the equipment fully visible.",
			"Avoid blurry images.",
			"Include several angles.",
			"Photograph the nameplate.",
			"Show any visible wear honestly.",
			"Phone photos are acceptable"
		]
	},
	notEveryPhoto: {
		"title": "Don't Have Every Photo?",
		"body": [
			"That's okay.",
			"Many sellers begin with only a few available images.",
			"Submit what you have today.",
			"If additional photos would help during the review process, Petra will let you know exactly what is needed."
		]
	},
	faqSection: { "title": "Frequently Asked Questions" },
	faqs: [
		{
			"question": "Do I need professional photographs?",
			"answer": "No. Clear photos taken with your phone are usually sufficient."
		},
		{
			"question": "How many photos should I upload?",
			"answer": "There isn't a required number, but multiple photos from different angles help us better evaluate your equipment."
		},
		{
			"question": "Should I photograph damaged areas?",
			"answer": "Yes. Showing wear or damage helps buyers understand the equipment and builds trust throughout the brokerage process."
		},
		{
			"question": "What if my equipment is still operating in the field?",
			"answer": "That's perfectly fine. Field photos often provide valuable context and are commonly used during the initial review."
		},
		{
			"question": "Can I upload additional photos later?",
			"answer": "Yes. If additional photos are needed, Petra will contact you during the review process."
		}
	],
	finalCta: {
		"title": "Ready to Upload Your Equipment Photos?",
		"body": [
			"Every submission begins with understanding the equipment.",
			"Clear photos help Petra evaluate your equipment, answer buyer questions, and present it professionally within our regional brokerage network.",
			"We'll review what you submit and let you know if anything else is needed."
		],
		"primaryCta": {
			"label": "Continue to Equipment Submission",
			"href": "/sell-equipment/equipment-submission"
		},
		"secondaryCta": {
			"label": "Contact a Broker",
			"href": "/sell-equipment/contact-broker"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/UploadPhotos.tsx
var UploadPhotos_exports = /* @__PURE__ */ __exportAll({ default: () => UploadPhotos });
var { meta: meta$2, hero: hero$2, whyPhotosMatter, recommendedPhotos, tips, notEveryPhoto, faqSection, faqs: faqs$2, finalCta: finalCta$2 } = upload_photos_default;
function UploadPhotos({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [
			sellEquipmentServiceNode(canonicalUrl, meta$2.description),
			breadcrumbNode(canonicalUrl, {
				name: "Equipment Photo Guide",
				url: canonicalUrl
			}),
			faqPageNode(canonicalUrl, faqs$2)
		]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta$2.title,
		description: meta$2.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero$2 }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Why It Helps",
						title: whyPhotosMatter.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: whyPhotosMatter.intro
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: whyPhotosMatter.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: whyPhotosMatter.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Photo Checklist",
					title: recommendedPhotos.title
				}), /* @__PURE__ */ jsx(CardGrid, {
					items: recommendedPhotos.items,
					columns: 3
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "dark",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Practical Tips",
						title: tips.title,
						tone: "dark"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: tips.intro,
							className: "text-base leading-7 text-white/70 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx("ul", {
						className: "mt-10 grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-3",
						children: tips.items.map((tip) => /* @__PURE__ */ jsxs("li", {
							className: "flex items-start gap-4 bg-[#1c1a16] p-5",
							children: [/* @__PURE__ */ jsx("span", {
								"aria-hidden": "true",
								className: "mt-2.5 h-1.5 w-1.5 shrink-0 bg-[#a56437]"
							}), /* @__PURE__ */ jsx("span", {
								className: "text-base leading-7 text-white/80",
								children: tip
							})]
						}, tip))
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "No Pressure",
					title: notEveryPhoto.title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: notEveryPhoto.body,
						className: "text-base leading-7 text-neutral-600 sm:text-lg"
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Questions",
					title: faqSection.title
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-10 max-w-4xl",
					children: /* @__PURE__ */ jsx(FaqAccordion, { faqs: faqs$2 })
				})]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta$2 })
		]
	})] });
}
var why_sell_with_petra_default = {
	meta: {
		"title": "Why Sell With Petra | Oilfield Equipment Brokerage",
		"description": "Learn why companies trust Petra to broker used oilfield and industrial equipment. Connect with qualified buyers through our Wyoming and Rockies brokerage network."
	},
	hero: {
		"title": "Why Sell With Petra",
		"subtitle": "Selling Equipment Is Easy. Selling It Well Takes the Right Partner.",
		"body": [
			"Finding a buyer isn't the hardest part of selling used oilfield or industrial equipment.",
			"Finding the right buyer, understanding today's market, pricing equipment realistically, and keeping the transaction moving—that's where experience matters.",
			"Petra helps equipment owners across Wyoming, the Rockies, and surrounding producing regions navigate the selling process with practical brokerage guidance, regional market knowledge, and a network of qualified buyers.",
			"Whether you're selling a single asset or managing surplus equipment across multiple locations, we're here to help you make informed decisions with confidence."
		],
		"primaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		},
		"secondaryCta": {
			"label": "Request a Market-Based Valuation",
			"href": "/sell-equipment/request-valuation"
		}
	},
	moreThanPosting: {
		"title": "Selling Equipment Is More Than Posting a Listing",
		"intro": ["Many equipment owners begin by listing equipment online and waiting for inquiries.", "Unfortunately, that often leads to:"],
		"items": [
			"Limited exposure to qualified buyers",
			"Uncertainty about market pricing",
			"Time spent answering repetitive questions",
			"Negotiations that go nowhere",
			"Equipment sitting idle for months"
		],
		"outro": {
			"before": "If you're still evaluating whether now is the right time to sell, ",
			"link": {
				"label": "request a market-based valuation",
				"href": "/sell-equipment/request-valuation"
			},
			"after": " to better understand your equipment's potential before making a decision."
		}
	},
	whatMakesDifferent: {
		"title": "What Makes Petra Different?",
		"items": [
			{
				"title": "Regional Market Knowledge",
				"body": [
					"Petra understands the equipment markets across Wyoming, the Rockies, and surrounding producing regions.",
					"Regional demand, industry activity, and buyer expectations all influence how equipment moves through the market.",
					"Our recommendations are based on real market conditions—not assumptions."
				]
			},
			{
				"title": "Qualified Buyer Network",
				"body": [
					"Successful brokerage isn't about generating the most inquiries.",
					"It's about connecting equipment with buyers who are actively looking for the right equipment.",
					"Petra focuses on building relationships with qualified buyers to help create meaningful opportunities for sellers."
				]
			},
			{
				"title": "Market-Based Guidance",
				"body": [
					"Pricing equipment too high can delay a sale.",
					"Pricing it too low can leave money on the table.",
					"Petra helps sellers understand current market conditions so they can make informed pricing decisions supported by brokerage experience and buyer activity."
				]
			},
			{
				"title": "Straightforward Communication",
				"body": [
					"You'll always know where things stand.",
					"We believe honest communication builds stronger relationships and better transactions.",
					"Whether market conditions are favorable or challenging, we'll provide practical recommendations based on your equipment and your goals."
				]
			},
			{
				"title": "Support Throughout the Brokerage Process",
				"body": ["Selling equipment often involves more than finding a buyer.", "From initial conversations through negotiations and transaction support, Petra works alongside sellers to help keep the process organized and moving forward."]
			},
			{
				"title": "Built on Relationships",
				"body": ["Equipment brokerage is ultimately a people business.", "Long-term relationships with equipment owners, buyers, and industry professionals allow Petra to create opportunities that go beyond public equipment listings."]
			}
		],
		"outro": {
			"before": "Curious about how we put this approach into practice? Explore our ",
			"link": {
				"label": "Seller Process",
				"href": "/sell-equipment/seller-process"
			},
			"after": " to see how Petra supports equipment owners from the initial review through buyer negotiations."
		}
	},
	builtForWyoming: {
		"title": "Built for Wyoming's Energy Industry",
		"body": [
			"The equipment market in Wyoming and the surrounding Rockies is different from many other regions.",
			"Equipment demand shifts with energy activity, transportation logistics, seasonal conditions, and regional projects.",
			"Petra understands these market dynamics and works within the industries and communities we serve every day.",
			"That regional perspective helps sellers make more informed decisions throughout the brokerage process."
		]
	},
	supportingOwners: {
		"title": "Supporting Equipment Owners Across the Energy Industry",
		"intro": ["Petra works with businesses throughout Wyoming, the Rockies, and surrounding producing regions, supporting equipment transactions across a wide range of energy and industrial operations.", "We regularly work with:"],
		"items": [
			"Oil & gas operators",
			"Production companies",
			"Midstream operations",
			"Energy service companies",
			"Industrial facilities",
			"General contractors",
			"Equipment managers",
			"Asset management teams"
		],
		"outro": "Whether you're selling a single piece of equipment, managing surplus assets, or preparing a larger equipment liquidation, Petra helps connect equipment owners with qualified buyers through a trusted regional brokerage network."
	},
	rightFit: {
		"title": "Is Petra the Right Fit?",
		"intro": "Petra may be a good fit if you:",
		"items": [
			"Have surplus or idle equipment you'd like to sell",
			"Want to better understand your equipment's market potential",
			"Don't have time to manage buyer inquiries and negotiations",
			"Prefer working with experienced equipment brokers",
			"Want honest guidance before making a decision",
			"Value long-term relationships over one-time transactions"
		],
		"outro": {
			"before": "If you're ready to take the next step, you can ",
			"link": {
				"label": "submit your equipment",
				"href": "/sell-equipment/equipment-submission"
			},
			"middle": " for review, or ",
			"secondLink": {
				"label": "talk to a broker",
				"href": "/sell-equipment/contact-broker"
			},
			"after": " if you'd like to discuss your situation first."
		}
	},
	ourApproach: {
		"title": "Our Approach",
		"intro": "Everything we do is guided by a few simple principles.",
		"items": [
			{
				"title": "Trust First",
				"body": "Honest communication and realistic expectations always come first."
			},
			{
				"title": "Field Realism",
				"body": "We understand equipment because we understand how it's used in the field."
			},
			{
				"title": "Practical Guidance",
				"body": "Our recommendations are based on market knowledge, industry experience, and your specific situation—not generic advice."
			},
			{
				"title": "Long-Term Relationships",
				"body": "We're committed to building relationships that continue long after a transaction is complete."
			}
		]
	},
	finalCta: {
		"title": "Let's Talk About Your Equipment",
		"body": [
			"Every equipment owner has different goals, and every selling decision deserves thoughtful guidance.",
			"Whether you're ready to sell today or simply exploring your options, Petra is here to provide practical recommendations, honest answers, and market insight that helps you move forward with confidence.",
			"Let's start with a conversation."
		],
		"primaryCta": {
			"label": "Talk to a Broker",
			"href": "/sell-equipment/contact-broker"
		},
		"secondaryCta": {
			"label": "Request a Valuation",
			"href": "/sell-equipment/request-valuation"
		}
	}
};
//#endregion
//#region resources/js/Pages/SellEquipment/WhySellWithPetra.tsx
var WhySellWithPetra_exports = /* @__PURE__ */ __exportAll({ default: () => WhySellWithPetra });
var { meta, hero, moreThanPosting, whatMakesDifferent, builtForWyoming, supportingOwners, rightFit, ourApproach, finalCta } = why_sell_with_petra_default;
function WhySellWithPetra({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [sellEquipmentServiceNode(canonicalUrl, meta.description), breadcrumbNode(canonicalUrl, {
			name: "Why Sell With Petra",
			url: canonicalUrl
		})]
	};
	return /* @__PURE__ */ jsxs(Fragment, { children: [/* @__PURE__ */ jsx(PublicPageMeta, {
		title: meta.title,
		description: meta.description,
		canonicalUrl,
		ogImageUrl,
		structuredData
	}), /* @__PURE__ */ jsxs("main", {
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx(PageHero, { ...hero }),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "The Problem",
						title: moreThanPosting.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: moreThanPosting.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: moreThanPosting.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: moreThanPosting.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Our Difference",
						title: whatMakesDifferent.title
					}),
					/* @__PURE__ */ jsx(CardGrid, {
						items: whatMakesDifferent.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: whatMakesDifferent.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "dark",
				children: [/* @__PURE__ */ jsx(SectionHeading, {
					eyebrow: "Regional Focus",
					title: builtForWyoming.title,
					tone: "dark"
				}), /* @__PURE__ */ jsx("div", {
					className: "mt-6 max-w-3xl space-y-4",
					children: /* @__PURE__ */ jsx(RichTextList, {
						items: builtForWyoming.body,
						className: "text-base leading-7 text-white/70 sm:text-lg"
					})
				})]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Who We Serve",
						title: supportingOwners.title
					}),
					/* @__PURE__ */ jsx("div", {
						className: "mt-6 max-w-3xl space-y-4",
						children: /* @__PURE__ */ jsx(RichTextList, {
							items: supportingOwners.intro,
							className: "text-base leading-7 text-neutral-600 sm:text-lg"
						})
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: supportingOwners.items,
						columns: 3
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600",
						children: supportingOwners.outro
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "cream",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Fit Check",
						title: rightFit.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: rightFit.intro
					}),
					/* @__PURE__ */ jsx(CheckList, {
						items: rightFit.items,
						columns: 2
					}),
					/* @__PURE__ */ jsx(RichText, {
						value: rightFit.outro,
						className: "mt-8 max-w-3xl text-base leading-7 text-neutral-600"
					})
				]
			}),
			/* @__PURE__ */ jsxs(Section, {
				background: "white",
				children: [
					/* @__PURE__ */ jsx(SectionHeading, {
						eyebrow: "Principles",
						title: ourApproach.title
					}),
					/* @__PURE__ */ jsx("p", {
						className: "mt-6 max-w-3xl text-base leading-7 text-neutral-600 sm:text-lg",
						children: ourApproach.intro
					}),
					/* @__PURE__ */ jsx(CardGrid, {
						items: ourApproach.items.map((item) => ({
							title: item.title,
							body: [item.body]
						})),
						columns: 2
					})
				]
			}),
			/* @__PURE__ */ jsx(FinalCta, { ...finalCta })
		]
	})] });
}
var services_default = {
	heroImage: "/images/petra-equipment-yard-hero.png",
	services: [
		{
			"title": "Equipment Brokerage",
			"summary": "Petra connects sellers and buyers around used oilfield and industrial equipment without a public auction process.",
			"details": [
				"Seller positioning",
				"Buyer qualification",
				"Negotiation support"
			]
		},
		{
			"title": "Asset Sourcing",
			"summary": "Petra helps buyers locate specific equipment through regional sellers, operator relationships, and quiet-market opportunities.",
			"details": [
				"Spec review",
				"Network search",
				"Fit verification"
			]
		},
		{
			"title": "Market Review",
			"summary": "Petra reviews equipment condition, documentation, field use, and practical market fit before a buyer or seller commits time.",
			"details": [
				"Condition context",
				"Regional demand",
				"Deal readiness"
			]
		},
		{
			"title": "Logistics Coordination",
			"summary": "Petra keeps logistics visible early so equipment movement, access, timing, and buyer expectations do not derail a deal.",
			"details": [
				"Location review",
				"Access notes",
				"Timing support"
			]
		}
	],
	workflow: [
		{
			"number": "01",
			"title": "Understand the Asset",
			"description": "We start with the equipment, region, condition, specs, documentation, and what the seller or buyer is trying to accomplish."
		},
		{
			"number": "02",
			"title": "Position the Opportunity",
			"description": "Petra frames the deal around field reality: use case, market fit, condition, logistics, and practical buyer questions."
		},
		{
			"number": "03",
			"title": "Connect the Right Side",
			"description": "We put sellers and buyers into relevant conversations instead of broadcasting equipment to everyone."
		},
		{
			"number": "04",
			"title": "Support the Deal",
			"description": "Petra helps carry the conversation through documentation, negotiation, timing, and movement planning."
		}
	],
	regions: [
		"Wyoming",
		"Powder River",
		"Rockies",
		"Bakken",
		"North Dakota",
		"Colorado",
		"Utah",
		"New Mexico",
		"Montana"
	],
	faqs: [
		{
			"question": "Is Petra an auction company?",
			"answer": "No. Petra is a brokerage-focused equipment firm built around direct buyer and seller conversations, practical equipment review, and controlled deal support."
		},
		{
			"question": "Can Petra help both buyers and sellers?",
			"answer": "Yes. Petra supports sellers looking to move used equipment and buyers looking to source specific oilfield or industrial assets."
		},
		{
			"question": "What regions does Petra serve?",
			"answer": "Petra works across Wyoming, the Powder River, the Rockies, the Bakken, North Dakota, Colorado, Utah, New Mexico, Montana, and surrounding producing regions."
		}
	]
};
//#endregion
//#region resources/js/Pages/Services.tsx
var Services_exports = /* @__PURE__ */ __exportAll({ default: () => Services });
var { heroImage, services, workflow, regions, faqs } = services_default;
var pageTitle = "Services | Petra";
var pageDescription = "Straight brokerage work between people who actually understand field equipment. Petra helps sellers move surplus equipment and buyers source the right assets.";
var docServices = [
	["Equipment Brokerage", "Connecting sellers with qualified buyers."],
	["Equipment Sourcing", "Finding hard-to-locate equipment through active networks."],
	["Asset Liquidation", "Helping companies clear surplus or idle equipment."],
	["Equipment Valuation", "Real market-based pricing guidance."],
	["Buyer Representation", "Helping buyers source and negotiate equipment."]
];
function Services({ canonicalUrl, ogImageUrl }) {
	const structuredData = {
		"@context": "https://schema.org",
		"@graph": [{
			"@type": "Service",
			"@id": `${canonicalUrl}#equipment-brokerage-services`,
			name: "Oilfield equipment brokerage services",
			url: canonicalUrl,
			description: pageDescription,
			provider: {
				"@type": "Organization",
				name: "Petra",
				url: canonicalUrl.replace(/\/services$/, "")
			},
			areaServed: regions,
			serviceType: ["Equipment brokerage", "Equipment sourcing"]
		}, {
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl}#breadcrumbs`,
			itemListElement: [{
				"@type": "ListItem",
				position: 1,
				name: "Home",
				item: canonicalUrl.replace(/\/services$/, "")
			}, {
				"@type": "ListItem",
				position: 2,
				name: "Services",
				item: canonicalUrl
			}]
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
				content: "Oilfield equipment yard represented by Petra brokerage services."
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
		className: "w-full bg-[#f3f1ec]",
		children: [
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsx("div", {
					className: "mx-auto max-w-[1280px] px-5 py-20 sm:px-10 lg:py-24",
					children: /* @__PURE__ */ jsxs("div", { children: [
						/* @__PURE__ */ jsx("h1", {
							className: "max-w-4xl font-hero text-[2.6rem] font-bold uppercase leading-[1.02] tracking-[0.08em] text-neutral-950 sm:text-[3.35rem] lg:text-[4.1rem]",
							children: "Services"
						}),
						/* @__PURE__ */ jsx("p", {
							className: "mt-6 max-w-3xl text-base font-medium leading-7 text-neutral-600 sm:text-lg",
							children: "Just straight brokerage work between people who actually understand field equipment."
						}),
						/* @__PURE__ */ jsxs("div", {
							className: "mt-10 flex flex-col gap-4 sm:flex-row",
							children: [/* @__PURE__ */ jsx("a", {
								href: "/sell-equipment",
								className: "inline-flex h-14 items-center justify-center bg-[#a56437] px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-white transition-opacity hover:opacity-90",
								children: "Sell Equipment"
							}), /* @__PURE__ */ jsx("a", {
								href: "/request-equipment",
								className: "inline-flex h-14 items-center justify-center border border-neutral-500 px-10 font-heading text-base font-semibold uppercase tracking-[0.1em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Request Equipment"
							})]
						})
					] })
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-y border-[#dad5cb] bg-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto grid max-w-[1280px] grid-cols-1 px-5 sm:px-10 md:grid-cols-2",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "flex flex-col border-b border-[#dad5cb] py-20 md:border-b-0 md:border-r md:py-28 md:pr-16 lg:pr-20",
						children: [
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
							/* @__PURE__ */ jsx("ul", {
								className: "mb-12 space-y-6",
								children: [
									"Get equipment in front of active buyers.",
									"Price it based on actual market movement, not guesswork.",
									"Handle buyer calls and negotiation.",
									"Move equipment without tying up your team."
								].map((item) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: item })]
								}, item))
							}),
							/* @__PURE__ */ jsx("p", {
								className: "mb-12 text-lg leading-8 text-neutral-600",
								children: "If you've got surplus iron sitting in a yard in Wyoming, North Dakota, or Colorado—we'll help you turn it into capital again."
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/sell-equipment",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start bg-[#a56437] px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-white transition-opacity hover:opacity-90",
								children: "Sell Equipment"
							})
						]
					}), /* @__PURE__ */ jsxs("div", {
						className: "flex flex-col py-20 md:py-28 md:pl-16 lg:pl-20",
						children: [
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
								children: "Most buyers do not need more listings. They need:"
							}),
							/* @__PURE__ */ jsx("ul", {
								className: "mb-12 space-y-6",
								children: [
									"The right size",
									"The right spec",
									"The right condition",
									"And someone who actually knows where to find it",
									"Tell us what you're trying to source.",
									"We work our network and come back with real options."
								].map((item) => /* @__PURE__ */ jsxs("li", {
									className: "flex items-start gap-4",
									children: [/* @__PURE__ */ jsx(FeatureIcon, {
										type: "check",
										className: "mt-0.5 h-5 w-5"
									}), /* @__PURE__ */ jsx("span", { children: item })]
								}, item))
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/request-equipment",
								className: "mt-auto inline-flex h-16 w-fit items-center self-start border border-neutral-950 px-12 font-heading text-base font-semibold uppercase tracking-[0.12em] text-neutral-950 transition-colors hover:bg-neutral-950 hover:text-white",
								children: "Request Equipment"
							})
						]
					})]
				})
			}),
			/* @__PURE__ */ jsx("section", {
				className: "border-b border-[#dad5cb] bg-[#1c1a16] text-white",
				children: /* @__PURE__ */ jsxs("div", {
					className: "mx-auto max-w-[1280px] px-5 py-12 sm:px-10",
					children: [/* @__PURE__ */ jsxs("div", {
						className: "mx-auto mb-9 max-w-3xl text-center",
						children: [/* @__PURE__ */ jsx("span", {
							className: "font-heading text-sm font-semibold uppercase tracking-[0.24em] text-[#b06b3d]",
							children: "Service Lines"
						}), /* @__PURE__ */ jsx("h2", {
							className: "mt-3 font-heading text-3xl font-semibold uppercase tracking-[0.08em] text-white sm:text-4xl",
							children: "How Petra Supports Equipment Deals"
						})]
					}), /* @__PURE__ */ jsx("div", {
						className: "grid grid-cols-1 gap-px bg-white/15 md:grid-cols-2 lg:grid-cols-5",
						children: docServices.map(([title, summary]) => /* @__PURE__ */ jsxs("article", {
							className: "bg-[#1c1a16] p-6 transition-colors hover:bg-[#24211c]",
							children: [
								/* @__PURE__ */ jsx("div", { className: "mb-5 h-1.5 w-1.5 bg-[#a56437]" }),
								/* @__PURE__ */ jsx("h3", {
									className: "font-heading text-2xl font-semibold uppercase tracking-[0.08em] text-white",
									children: title
								}),
								/* @__PURE__ */ jsx("p", {
									className: "mt-4 text-sm leading-6 text-white/65",
									children: summary
								})
							]
						}, title))
					})]
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
		className: "reveal-up w-full border-t border-[#dad5cb] bg-white",
		children: [/* @__PURE__ */ jsxs("div", {
			className: "stagger-children mx-auto grid max-w-[1280px] grid-cols-1 gap-14 px-5 py-20 sm:px-10 md:grid-cols-4 lg:py-24",
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
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/equipment",
							children: "Browse Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/sell-equipment",
							children: "Sell Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/request-equipment",
							children: "Request Equipment"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
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
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/privacy",
							children: "Privacy Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/terms",
							children: "Terms of Service"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
							href: "/cookies",
							children: "Cookie Policy"
						}),
						/* @__PURE__ */ jsx("a", {
							className: "focus-copper transition-colors hover:text-[#a56437]",
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
		href: "/equipment"
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
	},
	{
		label: "About",
		href: "/about"
	},
	{
		label: "Resources",
		href: "/resources"
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
	const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
	const { auth } = usePage().props;
	function logout() {
		setLogoutDialogOpen(false);
		router.post("/logout", {}, { replace: true });
	}
	return /* @__PURE__ */ jsxs("header", {
		className: "reveal-down sticky top-0 z-50 w-full border-b border-neutral-300 bg-[#f8f8f6]/95 shadow-[0_1px_0_rgba(255,255,255,0.7)_inset] backdrop-blur-sm",
		children: [
			/* @__PURE__ */ jsxs("nav", {
				"aria-label": "Primary navigation",
				className: "mx-auto grid min-h-18 w-full max-w-[1280px] grid-cols-[auto_1fr_auto] items-center gap-6 px-5 sm:px-10 2xl:px-0",
				children: [
					/* @__PURE__ */ jsx("a", {
						href: "/",
						className: "font-heading text-[1.8rem] font-semibold uppercase tracking-[0.22em] text-neutral-950",
						"aria-label": "Petra home",
						children: "PETRA"
					}),
					/* @__PURE__ */ jsx("div", {
						className: "hidden items-stretch justify-center gap-5 self-stretch xl:flex 2xl:gap-7",
						children: navItems.map((item) => {
							const active = isActivePath(item.href);
							return /* @__PURE__ */ jsxs("a", {
								href: item.href,
								"aria-current": active ? "page" : void 0,
								className: "group relative flex items-center whitespace-nowrap font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-600 transition-colors duration-200 hover:text-neutral-950 focus-copper",
								children: [/* @__PURE__ */ jsx("span", { children: item.label }), /* @__PURE__ */ jsx("span", {
									className: `absolute bottom-4 left-0 h-0.5 w-full origin-left bg-[#9d5f35] transition-transform duration-300 ${active ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"}`,
									"aria-hidden": "true"
								})]
							}, item.href);
						})
					}),
					/* @__PURE__ */ jsxs("div", {
						className: "flex items-center justify-end gap-3",
						children: [
							auth.user ? /* @__PURE__ */ jsx(Link, {
								href: auth.user.dashboard_url,
								className: "button-press focus-copper hidden h-10 items-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] md:flex",
								children: "Portal"
							}) : /* @__PURE__ */ jsx(Link, {
								href: "/login",
								className: "button-press focus-copper hidden h-10 items-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] md:flex",
								children: "Login"
							}),
							/* @__PURE__ */ jsx("a", {
								href: "/contact",
								className: "button-press focus-copper hidden h-10 items-center bg-[#9d5f35] px-6 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:flex",
								children: "Talk to a Broker"
							}),
							/* @__PURE__ */ jsx("button", {
								type: "button",
								"aria-expanded": menuOpen,
								className: "button-press focus-copper flex h-10 w-10 items-center justify-center border border-neutral-300 text-neutral-800 transition-colors hover:border-[#9d5f35] hover:text-[#9d5f35] xl:hidden",
								"aria-label": "Open menu",
								onClick: () => setMenuOpen((isOpen) => !isOpen),
								children: /* @__PURE__ */ jsx("span", { className: `block h-0.5 w-5 bg-current transition-transform before:block before:h-0.5 before:w-5 before:bg-current before:transition-transform before:content-[''] after:block after:h-0.5 after:w-5 after:bg-current after:transition-transform after:content-[''] ${menuOpen ? "rotate-45 before:translate-y-0 after:-translate-y-0.5 after:-rotate-90" : "before:-translate-y-1.5 after:translate-y-1"}` })
							})
						]
					})
				]
			}),
			menuOpen && /* @__PURE__ */ jsxs("div", {
				className: "reveal-down w-full border-b border-neutral-300 bg-[#f8f8f6] px-5 py-4 shadow-sm sm:px-10 xl:hidden",
				children: [
					/* @__PURE__ */ jsx("div", {
						className: "flex flex-col gap-1",
						children: navItems.map((item) => {
							const active = isActivePath(item.href);
							return /* @__PURE__ */ jsx("a", {
								href: item.href,
								"aria-current": active ? "page" : void 0,
								className: `focus-copper border-l-2 px-3 py-2 font-heading text-base font-semibold uppercase tracking-[0.08em] transition-colors ${active ? "border-[#9d5f35] text-neutral-950" : "border-transparent text-neutral-600 hover:text-neutral-950"}`,
								children: item.label
							}, item.href);
						})
					}),
					auth.user ? /* @__PURE__ */ jsxs("div", {
						className: "mt-3 grid grid-cols-2 gap-3 md:hidden",
						children: [/* @__PURE__ */ jsx(Link, {
							href: auth.user.dashboard_url,
							className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: "Portal"
						}), /* @__PURE__ */ jsx("button", {
							type: "button",
							onClick: () => setLogoutDialogOpen(true),
							className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: "Logout"
						})]
					}) : /* @__PURE__ */ jsxs("div", {
						className: "mt-3 grid grid-cols-2 gap-3 md:hidden",
						children: [/* @__PURE__ */ jsx(Link, {
							href: "/login",
							className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: "Login"
						}), /* @__PURE__ */ jsx(Link, {
							href: "/register",
							className: "button-press focus-copper flex h-10 items-center justify-center border border-neutral-300 px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-neutral-800",
							children: "Register"
						})]
					}),
					/* @__PURE__ */ jsx("a", {
						href: "/contact",
						className: "button-press focus-copper mt-3 flex h-10 items-center justify-center bg-[#9d5f35] px-5 font-heading text-base font-semibold uppercase tracking-[0.08em] text-white hover:bg-[#874d29] md:hidden",
						children: "Talk to a Broker"
					})
				]
			}),
			/* @__PURE__ */ jsx(ConfirmDialog, {
				open: logoutDialogOpen,
				title: "Log out?",
				description: "You will be signed out of your Petra portal session and returned to the login page.",
				confirmLabel: "Log out",
				onCancel: () => setLogoutDialogOpen(false),
				onConfirm: logout
			})
		]
	});
}
//#endregion
//#region resources/js/Layouts/AppLayout.tsx
function AppLayout({ children }) {
	const [isNavigating, setIsNavigating] = useState(false);
	useEffect(() => {
		const removeStartListener = router.on("start", () => setIsNavigating(true));
		const removeFinishListener = router.on("finish", () => setIsNavigating(false));
		return () => {
			removeStartListener();
			removeFinishListener();
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-transparent text-neutral-950",
		children: [
			/* @__PURE__ */ jsx(NavBar, {}),
			/* @__PURE__ */ jsx(AnimatedPage, {
				busy: isNavigating,
				children
			}),
			/* @__PURE__ */ jsx(Footer, {}),
			/* @__PURE__ */ jsx(Toaster, {
				position: "top-right",
				toastOptions: { classNames: {
					toast: "border border-[#dad5cb] bg-white text-neutral-950 shadow-none",
					title: "font-sans text-sm font-semibold",
					description: "font-sans text-sm text-neutral-600"
				} }
			})
		]
	});
}
//#endregion
//#region resources/js/Layouts/BlankLayout.tsx
/**
* A visit the reader did not initiate as navigation: either a partial reload (the
* messaging polls and mark-as-read, which carry `only`) or one explicitly flagged
* quiet (sending a message).
*
* Read defensively — both fields are Inertia-internal, and anything unexpected
* should fall through to "treat it as a real navigation" rather than throw.
*/
function isBackgroundVisit(event) {
	const visit = event?.detail?.visit;
	if (Array.isArray(visit?.only) && visit.only.length > 0) return true;
	return visit?.headers?.["X-Petra-Quiet-Visit"] === "1";
}
function BlankLayout({ children }) {
	const [isNavigating, setIsNavigating] = useState(false);
	useEffect(() => {
		const removeStartListener = router.on("start", (event) => {
			if (isBackgroundVisit(event)) return;
			setIsNavigating(true);
		});
		const removeFinishListener = router.on("finish", () => setIsNavigating(false));
		return () => {
			removeStartListener();
			removeFinishListener();
		};
	}, []);
	return /* @__PURE__ */ jsxs("div", {
		className: "min-h-screen bg-[#f3f1ec] text-neutral-950",
		children: [/* @__PURE__ */ jsx(AnimatedPage, {
			busy: isNavigating,
			children
		}), /* @__PURE__ */ jsx(Toaster, {
			position: "top-right",
			toastOptions: { classNames: {
				toast: "border border-[#dad5cb] bg-white text-neutral-950 shadow-none",
				title: "font-sans text-sm font-semibold",
				description: "font-sans text-sm text-neutral-600"
			} }
		})]
	});
}
//#endregion
//#region resources/js/ssr.tsx
createServer((page) => createInertiaApp({
	page,
	render: renderToString,
	resolve: (name) => {
		const resolvedPage = (/* @__PURE__ */ Object.assign({
			"./Pages/About.tsx": About_exports,
			"./Pages/Auth/ForgotPassword.tsx": ForgotPassword_exports,
			"./Pages/Auth/Login.tsx": Login_exports,
			"./Pages/Auth/Register.tsx": Register_exports,
			"./Pages/Auth/ResetPassword.tsx": ResetPassword_exports,
			"./Pages/Broker/Inbox.tsx": Inbox_exports,
			"./Pages/Broker/Leads.tsx": Leads_exports,
			"./Pages/Broker/Requests.tsx": Requests_exports,
			"./Pages/Broker/Submissions.tsx": Submissions_exports,
			"./Pages/Contact.tsx": Contact_exports,
			"./Pages/Equipment.tsx": Equipment_exports,
			"./Pages/EquipmentDetail.tsx": EquipmentDetail_exports,
			"./Pages/Errors/NotFound.tsx": NotFound_exports,
			"./Pages/Home.tsx": Home_exports,
			"./Pages/Industries.tsx": Industries_exports,
			"./Pages/LegalPage.tsx": LegalPage_exports,
			"./Pages/Portal/BuyerQuotes.tsx": BuyerQuotes_exports,
			"./Pages/Portal/BuyerRequests.tsx": BuyerRequests_exports,
			"./Pages/Portal/Dashboard.tsx": Dashboard_exports,
			"./Pages/Portal/Messages.tsx": Messages_exports,
			"./Pages/Portal/Placeholder.tsx": Placeholder_exports,
			"./Pages/Portal/Profile.tsx": Profile_exports,
			"./Pages/Portal/SellerListingDetail.tsx": SellerListingDetail_exports,
			"./Pages/Portal/SellerListings.tsx": SellerListings_exports,
			"./Pages/Portal/SellerOffers.tsx": SellerOffers_exports,
			"./Pages/RequestEquipment.tsx": RequestEquipment_exports,
			"./Pages/Resources.tsx": Resources_exports,
			"./Pages/SellEquipment/ContactBroker.tsx": ContactBroker_exports,
			"./Pages/SellEquipment/EquipmentSubmission.tsx": EquipmentSubmission_exports,
			"./Pages/SellEquipment/Faqs.tsx": Faqs_exports,
			"./Pages/SellEquipment/Index.tsx": Index_exports,
			"./Pages/SellEquipment/RequestValuation.tsx": RequestValuation_exports,
			"./Pages/SellEquipment/SellerProcess.tsx": SellerProcess_exports,
			"./Pages/SellEquipment/SubmissionThanks.tsx": SubmissionThanks_exports,
			"./Pages/SellEquipment/UploadDocuments.tsx": UploadDocuments_exports,
			"./Pages/SellEquipment/UploadPhotos.tsx": UploadPhotos_exports,
			"./Pages/SellEquipment/WhySellWithPetra.tsx": WhySellWithPetra_exports,
			"./Pages/Services.tsx": Services_exports
		}))[`./Pages/${name}.tsx`];
		resolvedPage.default.layout ??= (pageContent) => {
			return /* @__PURE__ */ jsx(name.startsWith("Auth/") || name.startsWith("Broker/") || name.startsWith("Portal/") ? BlankLayout : AppLayout, { children: pageContent });
		};
		return resolvedPage;
	},
	setup({ App, props }) {
		return /* @__PURE__ */ jsx(App, { ...props });
	}
}));
//#endregion
export {};
