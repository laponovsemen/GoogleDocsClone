import { paginationOptsValidator } from "convex/server";
import {mutation, query} from "./_generated/server";
import {ConvexError, v } from "convex/values";

export const getDocuments = query({
	args: {
		paginationOpts: paginationOptsValidator
	},
	handler: async (ctx, args) => {
		return ctx.db.query('documents').paginate(args.paginationOpts);
	},
});
export const removeById = mutation({
	args: {
		id: v.id('documents')
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError('Unauthorized');
		}
		const document = await ctx.db.get(args.id);
		if(!document) {
			throw new ConvexError('Document not found');
		}
		const isOwner = document.ownerId === user.subject;
	}
});
export const create = mutation({
	args: {
		title: v.optional(v.string()),
		initialContent: v.optional(v.string())
	},
	handler: async (ctx, args) => {
		const user = await ctx.auth.getUserIdentity();

		if (!user) {
			throw new ConvexError('Unauthorized');
		}
		const documentId = await ctx.db.insert('documents', {
			title: args.title ?? 'Untitled document',
			ownerId: user.subject,
			initialContent: args.initialContent
		})

		return documentId
	},
});

